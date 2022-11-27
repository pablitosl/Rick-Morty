const body = document.getElementById('body');
let nav = document.getElementById('nav');
const apiUrl = 'https://rickandmortyapi.com/api/character'

async function loadCharacters(url) {
    try {
        let template = '';
        let previous;
        let next;

        body.innerHTML = `<div class="spinner">

        <span>L</span>
        <span>O</span>
        <span>A</span>
        <span>D</span>
        <span>I</span>
        <span>N</span>
        <span>G</span>
    </div>`;


        let res = await fetch(url);
        let data = await res.json();
        let characters = data.results;

        if(!res.ok) throw {status: res.status, statusText: res.statusText};

        characters.forEach(character => {
                template += `<div class='card'>
                <img src="${character.image}" alt="${character.name}">
                    <h2>${character.name}</h2>
                    </div>`

        body.innerHTML = template;
        previous = data.info.prev ? `<a href="${data.info.prev}">⏮️</a>`: "";
        next = data.info.next ? `<a href="${data.info.next}">⏭️</a>`: "";
        nav.innerHTML = previous + "  " + next ;

        });
    } catch (err) {
        let message = err.statusText || 'Ocurrió un error';
        body.innerHTML = `<p class="error">Error ${err.status}: ${message}</p>`;
    }
}


document.addEventListener('DOMContentLoaded', () => loadCharacters(apiUrl));
document.addEventListener('click', e => {
    if(e.target.matches('a')) {
        e.preventDefault();
        loadCharacters(e.target.href);
    }
});