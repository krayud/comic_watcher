import API from './api'
import DOMElements from './DOMElements'

class VIEWER {

    constructor() {
        const urlParams = new URLSearchParams(window.location.search);
        this.currentComicId = urlParams.get('comic') || undefined;
        this.totalComics = undefined;
        this.currentComicData = null;
        this.DOMElements = new DOMElements({
            randomClick: this.getRandomComic.bind(this),
            toFirstClick: this.toFirstComic.bind(this),
            toLastClick: this.toLastComic.bind(this),
            toPrevClick: this.toPrevComic.bind(this),
            toNextClick: this.toNextComic.bind(this),
        });
    }

    getComicById(id) {
        this.DOMElements.startLoading();
        API.getComicById(id)
        .then(response => {
            response.json()
            .then(comicData => {
                this.updateCurrentComicData(comicData);
            })
            .catch(() => {
                alert("Ошибка парсинга ответа");
            })
        })
        .catch(() => {
            alert("Ошибка сети");
        })
    }

    init() {
        API.getLastComic()
        .then(response => {
            response.json()
            .then(comicData => {
                this.totalComics = comicData.num;
                if (this.currentComicId) {
                    this.getComicById(this.currentComicId);
                } else {
                    this.updateCurrentComicData(comicData);
                }
            })
            .catch(() => {
                alert("Ошибка парсинга ответа");
            })
        })
        .catch(() => {
            alert("Ошибка сети");
        })
    }
    updateCurrentComicData(comicData) {
        this.DOMElements.updateComicData(comicData)
        this.currentComicData = comicData;
        this.currentComicId = comicData.num;
        this.updateURL();
    }
    updateURL() {
        const queryParams = new URLSearchParams(window.location.search);
        queryParams.set("comic", this.currentComicData.num);
        history.replaceState(null, null, "?"+queryParams.toString());
    }

    getRandomComic() {
        const randomId = Math.floor(Math.random() * this.totalComics) + 1;
        this.getComicById(randomId);
    }

    toNextComic() {
        this.currentComicId = this.currentComicId === this.totalComics ? 1 : this.currentComicId + 1;
        this.getComicById(this.currentComicId);
    }

    toPrevComic() {
        this.currentComicId = this.currentComicId < 2 ? this.totalComics : this.currentComicId - 1;
        this.getComicById(this.currentComicId);
    }
    toFirstComic() {
        this.currentComicId = 1;
        this.getComicById(this.currentComicId);
    }

    toLastComic() {
        this.currentComicId = this.totalComics;
        this.getComicById(this.currentComicId);
    }
}

export default new VIEWER()