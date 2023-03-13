import { Component, OnInit } from '@angular/core';
import { APIServiceService } from '../apiservice.service';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})
export class MovieComponent implements OnInit {
  title:string = "Test Title";
  poster:string = "https://image.tmdb.org/t/p/w185/gqmcAVNNUosB55RliecFYnkWT4M.jpg"

  constructor(private api: APIServiceService){}

  ngOnInit(): void {
    this.poster = this.api.getPoster(this.poster);
  }

  goToMovie(test:any) {
    console.log("Movie clicked");
    // console.log(test)
  }

}
