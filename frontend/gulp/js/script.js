// class Playlist extends HTMLElement {
//     constructor() {
//         super();
//     }

//     createElem({ playName, playID }) {

//         this.playName = playName;
//         this.playID = playID;

//         this.render();
//     }
//     render() {
//         const elem = document.createElement('div');
//         elem.classList.add('playCont');

//         const playImageEl = document.createElement('img');
//         playImageEl.classList.add('image');
//         elem.appendChild(playImageEl);

//         const playNameEl = document.createElement('div');
//         playNameEl.classList.add('name');
//         playNameEl.textContent = this.playName;
//         elem.appendChild(playNameEl);

//         const playIDEl = document.createElement('div');
//         playIDEl.id = this.playID;
//         elem.appendChild(playIDEl);
//         //второй
//         const elem2 = document.createElement('div');
//         elem2.classList.add('playContainer');

//         const playImg = document.createElement('img');
//         playImg.classList.add('image');
//         elem2.appendChild(playImg);

//         const playNName = document.createElement('div');
//         playNName.classList.add('name2');
//         playNName.textContent = this.playName;
//         elem2.appendChild(playNName);

//         const playlID = document.createElement('div');
//         playlID.id = this.playID;
//         elem2.appendChild(playlID);

//         document.body.appendChild(elem);
//         document.body.appendChild(elem2);

//     }
// }

// customElements.define('dev-playlist', Playlist);

// const elemCreator = new Playlist();

// const json = [
//     { playName: 'Плейлист 1', playID: '123' },
// ];

// json.forEach((a) => {
//     elemCreator.createElem({ playName: a.playName, playID: a.playID });
// });

class CustomAudioVolumeControl extends HTMLElement {
    constructor() {
        super();
        this.audio = new Audio();
        this.playButton = document.createElement('button'); //убрать потом+замена на иконку звука
        this.playButton.textContent = 'да';
        this.playButton.style.margin = '20px';
        this.volumeControl = document.createElement('input');
        this.volumeControl.type = 'range';
        this.volumeControl.min = 0;
        this.volumeControl.max = 1;
        this.volumeControl.step = 0.01;
        this.volumeControl.value = 0.5;
        this.volumeControl.style.height = '50px';
        this.volumeControl.style.backgroundColor = 'green'; //не работает))) ну и синий тоже сойдет
        this.volumeControl.style.transform = 'rotate(-90deg)';
        this.volumeControl.style.marginTop = '50px';
        this.volumeControl.style.marginBottom = '50px';
        this.appendChild(this.playButton);
        this.appendChild(this.volumeControl);
    }

    connectedCallback() {
        this.audio.src = this.getAttribute('src');
        this.playButton.addEventListener('click', () => {
            if (this.audio.paused) {
                this.audio.play();
                this.playButton.textContent = 'нет';
            } else {
                this.audio.pause();
                this.playButton.textContent = 'да';
            }
        });
        this.volumeControl.addEventListener('input', this.adjustVolume.bind(this));
    }

    adjustVolume() {
        this.audio.volume = this.volumeControl.value;
    }

    static get observedAttributes() {
        return ['src'];
    }
    attributeChangedCallback(name, oldValue, newValue) {
        if (name === 'src') {
            this.audio.src = newValue;
        }
    }
}
customElements.define('custom-audio-volume-control', CustomAudioVolumeControl);