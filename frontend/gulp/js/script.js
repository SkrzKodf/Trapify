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
        //второй
        const elem2 = document.createElement('div');
        elem2.classList.add('playContainer');

        const playImg = document.createElement('img');
        playImg.classList.add('image');
        elem2.appendChild(playImg);

        const playNName = document.createElement('div');
        playNName.classList.add('name2');
        playNName.textContent = this.playName;
        elem2.appendChild(playNName);

        const playlID = document.createElement('div');
        playlID.id = this.playID;
        elem2.appendChild(playlID);

        document.body.appendChild(elem);
        document.body.appendChild(elem2);
    }
}

customElements.define('dev-playlist', Playlist);

const elemCreator = new Playlist();

const json = [
    { playName: 'Плейлист 1', playID: '123' },
];

json.forEach((a) => {
    elemCreator.createElem({ playName: a.playName, playID: a.playID });
});
