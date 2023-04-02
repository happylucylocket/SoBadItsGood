import { Component } from '@angular/core';
import { APIServiceService } from '../apiservice.service';
@Component({
  selector: 'app-description-review',
  templateUrl: './description-review.component.html',
  styleUrls: ['./description-review.component.css']
})

export class DescriptionReviewComponent {
  toggle = true;
  status = ''; 
  movieId!: number;

  constructor(private api: APIServiceService) {
  }
  ngOnInit(): void {
    this.movieId = this.api.getCurrentMovieId()
  }
  
  enableDisableRule() {
      this.toggle = !this.toggle;
      this.status = this.toggle ? '' : 'Liked!';
  }
}
