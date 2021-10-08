export class Movie {
  id: number;
  title: string;
  genreId: number;

  constructor(id: number, title: string, genreId: number) {
    this.id = id;
    this.title = title;
    this.genreId = genreId
  }
}
