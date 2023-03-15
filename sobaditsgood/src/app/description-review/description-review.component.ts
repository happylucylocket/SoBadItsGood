import { Component } from '@angular/core';

@Component({
  selector: 'app-description-review',
  templateUrl: './description-review.component.html',
  styleUrls: ['./description-review.component.css']
})
export class DescriptionReviewComponent {
  toggle = true;
  status = ''; 
  
  enableDisableRule() {
      this.toggle = !this.toggle;
      this.status = this.toggle ? '' : 'Liked!';
  }
}
