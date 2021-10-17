import { MovieService } from './../../services/movie.service';
import { MovieSearchComponent } from './../movie-search/movie-search.component';
import { User } from 'src/app/models/user';
import { ClientMessage } from './../../models/client-messages';
import { UserService } from 'src/app/services/user.service';
import { Component, OnInit } from '@angular/core';
import { Movie } from 'src/app/models/movie';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  // public u = new User(0, '', '', '', '', '', [], [], [])
  // public clientMessage = new ClientMessage('')
  public movies: Movie[] = [];

  constructor(private userService: UserService, private movieService: MovieService) { }

  ngOnInit(): void {
    this.getRandomMovies();
    // this.getUser();
  }

  public getRandomMovies(): void {
    this.movieService.getRandomMovies()
      .subscribe(data => {
        this.movies = data;
        console.log(this.movies)
        console.log(data)
      })
  }
}
