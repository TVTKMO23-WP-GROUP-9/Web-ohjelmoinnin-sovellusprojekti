class movieModel {
    constructor(id, title, poster_path) {
        this.id = id;
        this.title = title;
        this.poster_path = poster_path !== null ? `https://image.tmdb.org/t/p/w342` + poster_path : null;
    }

    getPoster() {
        return this.poster_path;
    }

    getId() {
        return this.id;
    }

    getTitle() {
        return this.title;
    }
}

module.exports = movieModel;