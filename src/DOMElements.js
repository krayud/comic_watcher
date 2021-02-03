class DOMElements {

    constructor(callbacks) {
        this.currentComicData = null;
        this.contentElement = document.querySelector('.watcher-content');
        this.titleElement = document.querySelector('.watcher-content__title');
        this.dateElement = document.querySelector('.watcher-content__date');
        this.imageElement = document.querySelector('.watcher-content__comic img');
        this.transcriptionElement = document.querySelector('.watcher-content__transcription');
        
        document.querySelector('#toFirstBtn').addEventListener('click', callbacks.toFirstClick);
        document.querySelector('#toLastBtn').addEventListener('click', callbacks.toLastClick);
        document.querySelector('#randomBtn').addEventListener('click', callbacks.randomClick);
        document.querySelector('#toPrevBtn').addEventListener('click', callbacks.toPrevClick);
        document.querySelector('#toNextBtn').addEventListener('click', callbacks.toNextClick);

        this.imageElement.onload = () => {
            if(this.currentComicData) {
                this.transcriptionElement.textContent = this.currentComicData.transcript;
                this.titleElement.textContent = this.currentComicData.safe_title;
                this.dateElement.textContent = `Дата размещения: ${this.currentComicData.day}.${this.currentComicData.month}.${this.currentComicData.year}`;
            }
            this.endLoading();
        }
    }

    updateComicData(data) {
        this.currentComicData = data;
        this.imageElement.src = this.currentComicData.img;
    }

    startLoading() {
        this.contentElement.classList.add('loading')
    }
    
    endLoading() {
        this.contentElement.classList.remove('loading');
    }
}

export default DOMElements