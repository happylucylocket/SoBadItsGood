import { Component, OnInit } from '@angular/core';
import { APIServiceService } from '../apiservice.service';

@Component({
  selector: 'app-movie-info',
  templateUrl: './movie-info.component.html',
  styleUrls: ['./movie-info.component.css']
})
export class MovieInfoComponent implements OnInit {
  movieId!: number;
  title!: string;
  poster!: string;
  releaseDate!: string;
  description!: string;
  runtime!: number;
  castPhoto!: string;
  cast:any[] = [];
  path: string = "http://image.tmdb.org/t/p/original"

  constructor(private api: APIServiceService) {
  }

  ngOnInit(): void {
    this.movieId = this.api.getCurrentMovieId()
    this.api.searchMovie(this.movieId).subscribe(data => {
      // Get title and concatenate with sliced date to show release year
      this.releaseDate = JSON.parse(data).release_date.slice(0,4);
      this.title = JSON.parse(data).title + " (" + this.releaseDate + ")";

      this.description = JSON.parse(data).overview;
      this.runtime = JSON.parse(data).runtime;
      this.poster = this.api.getPoster(JSON.parse(data).poster_path);
      
    })
    this.api.getCredits(this.movieId).subscribe(data => {
      this.cast = JSON.parse(data).cast.slice(0,7);
    })
  }


}
