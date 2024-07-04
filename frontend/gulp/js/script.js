/*class DevSong extends HTMLElement {
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
                    <div class="player__icon favorite repeat" type="favorite-repeat"> 
                        <span class="material-symbols-outlined icon__light">favorite</span> 
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

const player = new DevPlayer();
player.start({ title: 'Название песни', author: 'Исполнитель', id: '123' });

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

document.body.querySelector('.main').appendChild(playlist);*/

class DevSlider extends HTMLElement {
    constructor({ title, author, id } = {}) {
        super();
        this.title = title;
        this.author = author;
        this.id = id;
    }

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
            <div class="slider">
                <div class="slider__name">Мои плейлисты
                </div>
                <div class="playlist-slider__block">
                    <button class="prevButton"><strong><</strong></button>
                    <div class="playlist-slider">
                        <div class="playlist-slider__image">
                            <img src="https://i.ytimg.com/vi/F3jZFIvdEvk/maxresdefault.jpg"/>
                        </div>
                        <div class="playlist-slider__info">
                            <div class="playlist-slider__title">${this.title}</div>
                            <div class="playlist-slider__author">${this.author}</div>     
                        </div>
                    </div>

                    <div class="playlist-slider">
                        <div class="playlist-slider__image">
                            <img src="https://lastfm.freetls.fastly.net/i/u/ar0/b510156cc9d77ce76c05f5ad7cab4331.jpg"/>
                        </div>
                        <div class="playlist-slider__info">
                            <div class="playlist-slider__title">${this.title}</div>
                            <div class="playlist-slider__author">${this.author}</div>     
                        </div>
                    </div>

                    <div class="playlist-slider">
                        <div class="playlist-slider__image">
                            <img src="https://kalix.club/uploads/posts/2023-12/thumbs/1703659044_kalix-club-p-pirokinezis-oboi-foni-vkontakte-73.jpg"/>
                        </div>
                        <div class="playlist-slider__info">
                            <div class="playlist-slider__title">${this.title}</div>
                            <div class="playlist-slider__author">${this.author}</div>     
                        </div>
                    </div>
                    <div class="playlist-slider">
                        <div class="playlist-slider__image">
                            <img src="https://avatars.yandex.net/get-music-content/6201394/dbcb84f9.a.22839664-1/m1000x1000?webp=false"/>
                        </div>
                        <div class="playlist-slider__info">
                            <div class="playlist-slider__title">${this.title}</div>
                            <div class="playlist-slider__author">${this.author}</div>     
                        </div>
                    </div>        
                    <div class="playlist-slider">
                        <div class="playlist-slider__image">
                            <img src="https://cdn51.zvuk.com/pic?type=release&id=5825412&ext=jpg&size=1920x1920"/>
                        </div>
                        <div class="playlist-slider__info">
                            <div class="playlist-slider__title">${this.title}</div>
                            <div class="playlist-slider__author">${this.author}</div>     
                        </div>
                    </div>
                    <button class="nextButton"><strong>></strong></button>   
                </div>  


                <div class="slider__name">Чарты
                </div>
                <div class="chart-slider__block">
                    <button class="prevvButton"><strong><</strong></button>
                    <div class="chart-slider">
                        <div class="chart-slider__image">
                            <img src="https://avatars.yandex.net/get-music-content/4399834/0415f8b8.a.17439837-1/m1000x1000?webp=false"/>
                        </div>
                        <div class="chart-slider__info">
                            <div class="chart-slider__title">${this.title}</div>
                           <div class="chart-slider__author">${this.author}</div>     
                        </div>
                    </div>

                    <div class="chart-slider">
                        <div class="chart-slider__image">
                            <img src="https://u.kanobu.ru/editor/images/64/dbfbec53-999c-4037-8d52-030696393308.webp"/>
                        </div>
                        <div class="chart-slider__info">
                            <div class="chart-slider__title">${this.title}</div>
                            <div class="chart-slider__author">${this.author}</div>     
                        </div>
                    </div>

                    <div class="chart-slider">
                        <div class="chart-slider__image">
                            <img src="https://i.ytimg.com/vi/WlCYaadAIQU/maxresdefault.jpg"/>
                        </div>
                        <div class="chart-slider__info">
                            <div class="chart-slider__title">${this.title}</div>
                            <div class="chart-slider__author">${this.author}</div>     
                        </div>
                    </div>
                    <div class="chart-slider">
                        <div class="chart-slider__image">
                            <img src="https://i.pinimg.com/736x/7d/06/f4/7d06f4d90bdd446ee51380760e5816ab.jpg"/>
                        </div>
                        <div class="chart-slider__info">
                            <div class="chart-slider__title">${this.title}</div>
                            <div class="chart-slider__author">${this.author}</div>     
                        </div>
                    </div>        
                    <div class="chart-slider">
                        <div class="chart-slider__image">
                            <img src="https://i.pinimg.com/originals/39/fe/7f/39fe7f2c71e4e319979f72cfab11974f.jpg"/>
                        </div>
                        <div class="chart-slider__info">
                            <div class="chart-slider__title">${this.title}</div>
                            <div class="chart-slider__author">${this.author}</div>     
                        </div>
                    </div>
                    <button class="nexttButton"><strong>></strong></button>   
                </div>  
            </div> 
            <div class="slider__body"></div>   
        `;
    }
}

////Мой плейлист
customElements.define('dev-slider', DevSlider);

const slider = new DevSlider();
document.body.appendChild(slider);

const playlists = Array.from(slider.querySelectorAll('.playlist-slider'));
const prevPlaylist = slider.querySelector('.prevButton');
const nextPlaylist = slider.querySelector('.nextButton');
let currentPlaylistIndex = 0;

function showPlaylistSlides() {
    const screenWidth = window.innerWidth;
    if (screenWidth <= 1000) {
        playlists.forEach((playlist, index) => {
            if (index === currentPlaylistIndex) {
                playlist.style.display = 'flex';
            } else {
                playlist.style.display = 'none';
            }
        });
    } else {
        playlists.forEach((playlist, index) => {
            if (
                index >= currentPlaylistIndex &&
                index < currentPlaylistIndex + 3
            ) {
                playlist.style.display = 'flex';
            } else {
                playlist.style.display = 'none';
            }
        });
    }
}

prevPlaylist.addEventListener('click', () => {
    if (currentPlaylistIndex > 0) {
        currentPlaylistIndex -= 1;
        showPlaylistSlides();
    }
});

nextPlaylist.addEventListener('click', () => {
    if (currentPlaylistIndex < playlists.length - 3) {
        currentPlaylistIndex += 1;
        showPlaylistSlides();
    }
});

showPlaylistSlides();

/////Чарты
const charts = Array.from(slider.querySelectorAll('.chart-slider'));
const prevChart = slider.querySelector('.prevvButton');
const nextChart = slider.querySelector('.nexttButton');
let currentChartIndex = 0;

function showChartSlides() {
    const screenWidth = window.innerWidth;
    if (screenWidth <= 1000) {
        charts.forEach((chart, index) => {
            if (index === currentChartIndex) {
                chart.style.display = 'flex';
            } else {
                chart.style.display = 'none';
            }
        });
    } else {
        charts.forEach((chart, index) => {
            if (
                index >= currentChartIndex &&
                index < currentChartIndex + 3
            ) {
                chart.style.display = 'flex';
            } else {
                chart.style.display = 'none';
            }
        });
    }
}


prevChart.addEventListener('click', () => {
    if (currentChartIndex > 0) {
        currentChartIndex -= 1;
        showChartSlides();
    }
});

nextChart.addEventListener('click', () => {
    if (currentChartIndex < charts.length - 3) {
        currentChartIndex += 1;
        showChartSlides();
    }
});

showChartSlides();
