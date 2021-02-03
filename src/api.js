class API {
    constructor() {
        this.proxy = 'https://any-api.com:8443';
        this.comicAPI = 'https://xkcd.com';
        this.comicAPISuffix = 'info.0.json'
    }

    getComicById(id) {
        return fetch(`${this.proxy}/${this.comicAPI}/${id}/${this.comicAPISuffix}`);
    }

    getLastComic() {
        return fetch(`${this.proxy}/${this.comicAPI}/${this.comicAPISuffix}`);
    }
}

export default new API()