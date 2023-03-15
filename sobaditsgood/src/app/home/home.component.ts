import { Component, OnInit } from '@angular/core';
import { APIServiceService } from '../apiservice.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit{
  title!: string;
  posterPath!: string;
  movies: number[] = [];

  constructor(private api: APIServiceService){}

  ngOnInit(): void {

    this.api.getData().subscribe(data =>{
      console.log(data);
    });
    this.movies = this.api.getMovies();
    for (var i = 0; i < this.movies.length; i++) {
      this.api.searchMovie(this.movies[i]).subscribe(data => {
        this.title = JSON.parse(data).title;
      })
    }

    for (var i = 0; i < this.movies.length; i++) {
      this.api.searchMovie(this.movies[i]).subscribe(data => {
        this.posterPath = this.api.getPoster(JSON.parse(data).poster_path);
      })
    }
    // this.api.searchMovie(40016).subscribe(data => {
    //   console.log(JSON.parse(data).title);
    //   this.test = JSON.parse(data).title;
    // })
    
  }

  goToMovie(test:any) {
    console.log("Movie clicked");
    console.log(test)
  }
}