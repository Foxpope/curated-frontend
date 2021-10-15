export class Movie {
  id: number;
  title: string;
  year: number;
  rated: string;
  released: string;
  director: string;
  plot: string;
  poster: string;
  genre: string;
  metacritic: string;
  runtime: string;
  actors: string;

  constructor(id: number, title: string, year: number, rated: string, released: string,
    director: string, plot: string, poster: string,   genre: string, metacritic: string, runtime: string, actors: string) {
    this.id = id;
    this.title = title;
    this.year = year;
    this.rated = rated;
    this.released= released;
    this.director = director;
    this.plot = plot;
    this.poster = poster;
    this.genre = genre;
    this.metacritic = metacritic;
    this.runtime = runtime;
    this.actors = actors;
  }
}