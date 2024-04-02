class MovieData {
    constructor(
        id, 
        title, 
        poster_path
    ) {
        this.id = id;
        this.title = title;
        this.poster_path = `https://image.tmdb.org/t/p/w342` + poster_path; 
        console.log("Poster path:", this.poster_path);
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
  
  module.exports = MovieData;