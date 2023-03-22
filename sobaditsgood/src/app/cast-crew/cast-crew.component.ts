import { Component, OnInit } from '@angular/core';
import { APIServiceService } from '../apiservice.service';

@Component({
  selector: 'app-cast-crew',
  templateUrl: './cast-crew.component.html',
  styleUrls: ['./cast-crew.component.css']
})
export class CastCrewComponent implements OnInit {
  movieId!: number;
  cast:any[] = [];
  crew:any[] =[];
  path: string = "http://image.tmdb.org/t/p/original"

  constructor(private api: APIServiceService){}

  ngOnInit(): void {
    this.movieId = this.api.getCurrentMovieId()
    this.api.getCredits(this.movieId).subscribe(data => {
      this.cast = JSON.parse(data).cast;
    })
    this.api.getCredits(this.movieId).subscribe(data => {
      this.crew = JSON.parse(data).crew;
    })
  }

  

}
