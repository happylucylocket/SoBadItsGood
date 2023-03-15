import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { APIServiceService } from '../apiservice.service';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})
export class MovieComponent implements OnChanges {
  @Input() movieTitle = '';
  @Input() moviePoster = '';

  constructor(private api: APIServiceService){}

  ngOnInit(): void {
  }
  ngOnChanges(changes: SimpleChanges) {
    // console.log(changes);
  }
}
