class DevSong extends HTMLElement {
    constructor({ title, author, id } = {}) {
        super();
        this.title = title;
        this.author = author;
        this.id = id;
    }

    // <dev-song title="qwe" author="qwe" id="asd" ></dev-song>
    connectedCallback() {
        if (!this.title) {
            this.title = this.getAttribute('title');
        }

        if (!this.author) {
            this.author = this.getAttribute('author');
        }

        if (!this.id) {
            this.id = this.getAttribute('id');
        }

        this.render();
    }

    render() {
        this.innerHTML = `
          <div class="song">
                <div class="song__img-info">
                    <div class="song__image">
                        <img src=""/>
                    </div>
                    <div class="song__info">
                        <div class="song__title">${this.title}</div>
                        <div class="song__author">${this.author}</div>    
                    </div>
                </div>
                <div class="song__favorite" value="${this.id}">
                    <span class="material-symbols-outlined icon__light">favorite</span>
                </div>
            </div>
        `;
    }
}

class DevPlayList extends HTMLElement {
    constructor({ id, songs, title, author } = {}) {
        super();
        this.id = id;
        this.title = title;
        this.author = author;
        this.songs = songs ? songs : [];
    }

    // <dev-playlist title="qwe" id="qwe" >
    //      <dev-song title="qwe" author="qwe" id="asd" ></dev-song>
    //      <dev-song title="qwe" author="qwe" id="asd" ></dev-song>
    //      <dev-song title="qwe" author="qwe" id="asd" ></dev-song>
    //      <dev-song title="qwe" author="qwe" id="asd" ></dev-song>
    // </dev-song>
    connectedCallback() {
        if (!this.id) {
            this.id = this.getAttribute('id');
        }

        if (!this.title) {
            this.title = this.getAttribute('title');
        }

        if (!this.author) {
            this.author = this.getAttribute('author');
        }

        const childrenSongs = this.querySelectorAll('dev-song');

        childrenSongs.forEach((song) => {
            this.songs.push(song);
        });

        this.render();
    }

    render() {
        this.innerHTML = `
        <div class="playlist__header">
            <div class="playlist__image">
                <img src=""/>
            </div>
            <div class="playlist__info">
                <div class="playlist__title">${this.title}</div>
                <div class="playlist__author">${this.author}</div>    
            </div>
        </div>
        <div class="playlist__body">

        </div>
        `;

        this.querySelector('.playlist__body').addEventListener(
            'click',
            (event) => {
                const target = event.target;

                if (
                    !target.classList.includes('song__favorite') &&
                    !target.parentElement.classList.includes('song__favorite')
                ) {
                    return;
                }

                // TODO: Логика
            },
        );

        this.addSongs(this.songs);
    }

    addSongs(songs = []) {
        const container = this.querySelector('.playlist__body');
        songs.forEach((song) => {
            container.appendChild(song);
        });
    }
}

class DevPlayer extends HTMLElement {
    constructor() {
        super();
    }

    start({ title, author, id }) {
        this.state = { title, author, id };
    }

    connectedCallback() {
        this.render();
        this.connectControls();
        this.initListeners();
    }

    render() {
        this.innerHTML = `
           <div class="player"> 
                <div class="player__image">
                    <img src=""/>
                </div>
                <div class="player__nameplay" >
                    <div class="player__info">
                        <div class="player__title">${this.title}</div>
                        <div class="player__author">${this.author}</div>    
                    </div>
                    <div class="player__controls">
                        <div class="player__control prev" type="prev">
                            <span class="material-symbols-outlined icon__light-fill">skip_previous</span>
                        </div>
                        <div class="player__control play" type="play">
                            <span class="material-symbols-outlined icon__light-fill">play_circle</span>
                        </div>  
                        <div class="player__control next" type="next">
                            <span class="material-symbols-outlined icon__light-fill">skip_next</span>
                        </div> 
                    </div>
                </div>
                <div class="player__icons">
                    <div class="player__icon favorite" type="favorite">
                        <span class="material-symbols-outlined icon__light">favorite</span>
                    </div>
                    <div class="player__icon repeat" type="repeat">
                        <span class="material-symbols-outlined icon__light">repeat</span>
                    </div>  
                    <div class="player__icon" type="valume">
                        <span class="material-symbols-outlined icon__light">volume_up</span>
                    </div>  
                </div>
            </div>
        `;
    }

    connectControls() {
        this.controls = {
            play: this.querySelector('.player__control.play'),
            next: this.querySelector('.player__control.next'),
            prev: this.querySelector('.player__control.prev'),
            favorite: this.querySelector('.player__icon.favorite'),
            repeat: this.querySelector('.player__icon.repeat'),
            valume: this.querySelector('.player__icon.valume'),
        };
    }

    initListeners() {
        this.controls.play.addEventListener('click', () => {
            if (this.state.isPlay) {
                // TODO: остановить музыку
                this.controls.play.firstChild.textContent = 'pause_circle';
            } else {
                // TODO: Запустить музыку
                this.controls.play.firstChild.textContent = 'play_circle';
            }
        });

        //TODO: остальные слушатели
    }
}

customElements.define('dev-playlist', DevPlayList);
customElements.define('dev-song', DevSong);
customElements.define('dev-player', DevPlayer);

const player = document.querySelector('dev-player');

const playlist = new DevPlayList({
    title: 'Название плейлиста',
    id: '123-456-789',
    songs: [
        new DevSong({ author: 'Исполнитель', title: 'Название', id: '1' }),
        new DevSong({ author: 'Исполнитель', title: 'Название', id: '2' }),
        new DevSong({ author: 'Исполнитель', title: 'Название', id: '3' }),
        new DevSong({ author: 'Исполнитель', title: 'Название', id: '4' }),
        new DevSong({ author: 'Исполнитель', title: 'Название', id: '5' }),
        new DevSong({ author: 'Исполнитель', title: 'Название', id: '6' }),
    ],
    author: 'Автор плейлиста',
});

document.body.querySelector('.main').appendChild(playlist);
