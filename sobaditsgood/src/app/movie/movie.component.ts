import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { APIServiceService } from '../apiservice.service';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})
export class MovieComponent implements OnChanges, OnInit {
  movieTitle!: string;
  moviePoster!: string;
  @Input() movie =0;

  constructor(private api: APIServiceService){}

  ngOnInit(): void {

    this.api.getData().subscribe(data =>{
      console.log(data);
    });

    this.api.searchMovie(this.movie).subscribe(data => {
      this.movieTitle= JSON.parse(data).title;
    })

    this.api.searchMovie(this.movie).subscribe(data => {
      this.moviePoster = this.api.getPoster(JSON.parse(data).poster_path);
    })
    
  }
  ngOnChanges(changes: SimpleChanges) {
    // console.log(changes);
  }
}
