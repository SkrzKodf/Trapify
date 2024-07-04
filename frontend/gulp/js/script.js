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



// class CustomAudioVolumeControl extends HTMLElement {
//     constructor() {
//         super();
//         this.audio = new Audio();
//         this.playButton = document.createElement('button');
//         this.playButton.textContent = 'Play';
//         this.playButton.style.margin = '2rem';

//         this.sliderContainer = document.createElement('div');
//         this.sliderContainer.style.height = '150px';
//         this.sliderContainer.style.width = '5px';
//         this.sliderContainer.style.position = 'relative';
//         this.sliderContainer.style.marginTop = '5rem';

//         this.volumeBar = document.createElement('div');
//         this.volumeBar.style.height = '100%';
//         this.volumeBar.style.width = '0.5rem';
//         this.volumeBar.style.margin = '10px';
//         this.volumeBar.style.backgroundColor = '#e4e4e4';
//         this.volumeBar.style.position = 'absolute';
//         this.volumeBar.style.bottom = '1';

//         this.volumeProgress = document.createElement('div');
//         this.volumeProgress.style.height = '50%';
//         this.volumeProgress.style.width = '0.5rem';
//         this.volumeProgress.style.margin = '10px';
//         this.volumeProgress.max = 1;
//         this.volumeProgress.min = 0;

//         this.volumeProgress.style.backgroundColor = '#2e2c2c';
//         this.volumeProgress.style.position = 'absolute';
//         this.volumeProgress.style.bottom = '1';

//         this.sliderContainer.appendChild(this.volumeBar);
//         this.sliderContainer.appendChild(this.volumeProgress);

//         this.appendChild(this.playButton);
//         this.appendChild(this.sliderContainer);
//     }

//     connectedCallback() {
//         this.audio.src = this.getAttribute('src');

//         this.playButton.addEventListener('click', () => {
//             if (this.audio.paused) {
//                 this.audio.play();
//                 this.playButton.textContent = 'Pause';
//             } else {
//                 this.audio.pause();
//                 this.playButton.textContent = 'Play';
//             }
//         });

//         this.volumeProgress.addEventListener('input', () => {
//             this.adjustVolume();
//         });
//     }

//     adjustVolume() {
//         this.audio.volume = parseFloat(this.volumeProgress.style.height) / this.sliderContainer.clientHeight;
//     }

//     static get observedAttributes() {
//         return ['src'];
//     }

//     attributeChangedCallback(name, oldValue, newValue) {
//         if (name === 'src') {
//             this.audio.src = newValue;
//         }
//     }
// }
// customElements.define('custom-audio-volume-control', CustomAudioVolumeControl);


// class CustomAudioVolumeControl extends HTMLElement {
//     constructor() {
//         super();
//         this.audio = new Audio();
//         this.playButton = document.createElement('button');
//         this.playButton.textContent = 'да';

//         this.volumeControl = document.createElement('input');
//         this.volumeControl.type = 'range';
//         this.volumeControl.min = 0;
//         this.volumeControl.max = 1;
//         this.volumeControl.step = 0.01;
//         this.volumeControl.value = 0.5;

//         this.appendChild(this.playButton);
//         this.appendChild(this.volumeControl);

//         // Добавляем стилизацию
//         this.style.backgroundColor = '#f0f0f0';
//     }

//     connectedCallback() {
//         this.audio.src = this.getAttribute('src');
//         this.playButton.addEventListener('click', () => {
//             if (this.audio.paused) {
//                 this.audio.play();
//                 this.playButton.textContent = 'не';
//             } else {
//                 this.audio.pause();
//                 this.playButton.textContent = 'да';
//             }
//         });
//         this.volumeControl.addEventListener('input', this.adjustVolume.bind(this));
//     }

//     adjustVolume() {
//         this.audio.volume = this.volumeControl.value;
//     }

//     static get observedAttributes() {
//         return ['src'];
//     }
//     attributeChangedCallback(name, oldValue, newValue) {
//         if (name === 'src') {
//             this.audio.src = newValue;
//         }
//     }
// }
// customElements.define('custom-audio-volume-control', CustomAudioVolumeControl);

class CustomAudioVolumeControl extends HTMLElement {
    constructor() {
        super();
        this.audio = new Audio();
        this.playButton = document.createElement('button');
        this.playButton.textContent = 'да';

        this.volumeBar = document.createElement('div');
        this.volumeBar.style.width = '10px';
        this.volumeBar.style.height = '150px';
        this.volumeBar.style.backgroundColor = '#2E2C2C';
        this.volumeBar.style.marginLeft = '2rem';

        this.volumeProgress = document.createElement('div');
        this.volumeProgress.style.width = '100%';
        this.volumeProgress.style.backgroundColor = '#e4e4e4';
        this.volumeProgress.style.height = '50%';


        this.appendChild(this.playButton);
        this.appendChild(this.volumeBar);

        this.volumeBar.appendChild(this.volumeProgress);
    }

    connectedCallback() {
        this.audio.src = this.getAttribute('src');
        this.playButton.addEventListener('click', () => {
            if (this.audio.paused) {
                this.audio.play();
                this.playButton.textContent = 'не';
            } else {
                this.audio.pause();
                this.playButton.textContent = 'да';
            }
        });

        this.volumeBar.addEventListener('click', this.adjustVolume.bind(this));
    }
    adjustVolume(event) {
        const clickY = event.clientY - this.volumeBar.getBoundingClientRect().top;
        const height = this.volumeBar.offsetHeight;
        const volume = clickY / height;
        this.audio.volume = 1 - volume;
        this.volumeProgress.style.height = (volume * 100) + '%';
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