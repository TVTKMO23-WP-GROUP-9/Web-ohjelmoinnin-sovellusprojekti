class movieModel {
    constructor(id, title, poster_path, overview, adult) {
        this.id = id;
        this.title = title;
        this.poster_path = poster_path !== null ? `https://image.tmdb.org/t/p/w342` + poster_path : null;
        this.overview = overview;
        this.adult = adult;
        
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

    getOverview() {
        return this.overview;
    }

    getOverview() {
        return this.adult;
    }
}


module.exports = movieModel;