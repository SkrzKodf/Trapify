document.getElementById('reg').style.display = 'none';
document.getElementById('login').style.display = 'block';

document.getElementById('showReg').addEventListener('click', function (event) {
    document.getElementById('reg').style.display = 'block';
    document.getElementById('login').style.display = 'none';
    event.preventDefault();
});

document
    .getElementById('showLogin')
    .addEventListener('click', function (event) {
        document.getElementById('reg').style.display = 'none';
        document.getElementById('login').style.display = 'block';
        event.preventDefault();
    });

class CustomAudioProgressBar extends HTMLElement {
    constructor() {
      super();
      this.audio = new Audio();
      this.progressBar = document.createElement('div');
      this.progressBar.style.width = '100%';
      this.progressBar.style.height = '5px';
      this.progressBar.style.backgroundColor = '#e4e4e4';
      this.progress = document.createElement('div');
      this.progress.style.height = '5px';
      this.progress.style.backgroundColor = '#2E2C2C';
      this.progress.style.width = '0%';
    }
  
    connectedCallback() {
      this.audio.src = this.getAttribute('src');
      this.appendChild(this.progressBar);
      this.progressBar.appendChild(this.progress);
      this.audio.addEventListener('timeupdate', this.updateProgress.bind(this));
      this.progressBar.addEventListener('click', this.seek.bind(this));
    }
  
    updateProgress() {
      const percentage = (this.audio.currentTime / this.audio.duration) * 100;
      this.progress.style.width = percentage + '%';
    }
  
    seek(event) {
      const clickX = event.offsetX;
      const width = this.progressBar.offsetWidth;
      const duration = this.audio.duration;
      this.audio.currentTime = (clickX / width) * duration;
      this.audio.play();
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

  customElements.define('custom-audio-progress-bar', CustomAudioProgressBar);
  
