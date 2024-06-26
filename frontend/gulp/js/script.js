class Playlist extends HTMLElement {
    constructor() {
        super();
    }

    createElem({ playName, playID }) {

        this.playName = playName;
        this.playID = playID;

        this.render();
    }
    render() {
        const elem = document.createElement('div');
        elem.classList.add('playCont');

        const playImageEl = document.createElement('img');
        playImageEl.classList.add('image');
        elem.appendChild(playImageEl);

        const playNameEl = document.createElement('div');
        playNameEl.classList.add('name');
        playNameEl.textContent = this.playName;
        elem.appendChild(playNameEl);

        const playIDEl = document.createElement('div');
        playIDEl.id = this.playID;
        elem.appendChild(playIDEl);

        document.body.appendChild(elem);
    }
}

customElements.define('dev-playlist', Playlist);

const elemCreator = new Playlist();

const json = [
    { playName: 'Плейлист 1', playID: '123' }
];

json.forEach((a) => {
    elemCreator.createElem({ playName: a.playName, playID: a.playID });
});
