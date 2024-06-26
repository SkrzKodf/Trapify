class Playlist extends HTMLElement {
    constructor() {
        super();
    }

    createElem({ title, author, id }) {
        this.title = title;
        this.author = author;
        this.id = id;

        this.render();
    }

    render() {
        const main = document.createElement('div');
        main.classList.add('main');

        const one = document.createElement('div');
        one.classList.add('one');

        const text = document.createElement('div');
        text.classList.add('text');

        const iconElement = document.createElement('span');
        iconElement.classList.add('material-symbols-outlined');
        iconElement.textContent = 'favorite'

        const imageElement = document.createElement('div');
        imageElement.classList.add('image');
        
        const titleElement = document.createElement('div'); 
        titleElement.classList.add('title');
        titleElement.textContent = this.title

        const authorElement = document.createElement('div'); 
        authorElement.classList.add('author');
        authorElement.textContent = this.author

        main.appendChild(one);
        one.appendChild(imageElement);
        one.appendChild(text);
        main.appendChild(iconElement);
        text.appendChild(titleElement);
        text.appendChild(authorElement);

        document.body.appendChild(main);
    }
}

customElements.define('dev-playlist', Playlist);

const elemCreator = new Playlist();

const json = [
    { title: 'Название', author: 'Исполнитель', id: 1 },
    { title: 'Название', author: 'Исполнитель', id: 2 },
    { title: 'Название', author: 'Исполнитель', id: 3 },

];

json.forEach((a) => {
    elemCreator.createElem({ title: a.title, author: a.author, id: a.id });
});