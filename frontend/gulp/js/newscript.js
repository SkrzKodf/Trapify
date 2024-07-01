/*class MySong extends HTMLElement {
    constructor() {
        super();
    }

    render(){
        const block = document.createElement('div');
        block.classList.add('block');



        const blockOne = document.createElement('div');
        blockOne.classList.add('blockOne');

        const NamePic = document.createElement('div');
        NamePic.classList.add('NamePic');

        const textBlock = document.createElement('div');
        textBlock.classList.add('textBlock');


        const imageElement = document.createElement('div');
        imageElement.classList.add('image');

        const titleElement = document.createElement('div');
        titleElement.classList.add('title');
        titleElement.textContent = this.title;

        const authorElement = document.createElement('div');
        authorElement.classList.add('author');
        authorElement.textContent = this.author;

        const LikeElement = document.createElement('span');
        LikeElement.classList.add('material-symbols-outlined');
        LikeElement.classList.add('icon__light');
        LikeElement.textContent = 'favorite';



        const blockTwo = document.createElement('div');
        blockTwo.classList.add('blockTwo');

        const PlaySong = document.createElement('div');
        PlaySong.classList.add('PlaySong');

        const skipLeftElement = document.createElement('span');
        skipLeftElement.classList.add('material-symbols-outlined');
        skipLeftElement.classList.add('icon__light-fill');
        skipLeftElement.textContent = 'skip_previous';

        const PauseElement = document.createElement('span');
        PauseElement.classList.add('material-symbols-outlined');
        PauseElement.classList.add('icon__light-fill');
        PauseElement.textContent = 'pause_circle';

        const skipRightElement = document.createElement('span');
        skipRightElement.classList.add('material-symbols-outlined');
        skipRightElement.classList.add('icon__light-fill');
        skipRightElement.textContent = 'skip_next';

        const RepiatElement = document.createElement('span');
        RepiatElement.classList.add('material-symbols-outlined');
        RepiatElement.classList.add('icon__light');
        RepiatElement.textContent = 'repeat';


        const SoundElement = document.createElement('span');
        SoundElement.classList.add('material-symbols-outlined');
        SoundElement.classList.add('icon__light');
        SoundElement.textContent = 'volume_up';



        block.appendChild(blockOne);
        block.appendChild(blockTwo);
        block.appendChild(SoundElement);


        blockOne.appendChild(NamePic);
        blockOne.appendChild(LikeElement);


        NamePic.appendChild(imageElement);
        NamePic.appendChild(textBlock);


        textBlock.appendChild(titleElement);
        textBlock.appendChild(authorElement);

        blockTwo.appendChild(PlaySong);
        blockTwo.appendChild(RepiatElement);


        PlaySong.appendChild(skipLeftElement);
        PlaySong.appendChild(PauseElement);
        PlaySong.appendChild(skipRightElement);

        document.body.appendChild(block);
    }
}

customElements.define('dev-mysong', MySong);

const elementCreator = new MySong();

const song = [
    { title: 'Название', author: 'Исполнитель', id: 1 },
];

song.forEach((a) => {
    elemCreator.createElem({ title: a.title, author: a.author, id: a.id });
});*/