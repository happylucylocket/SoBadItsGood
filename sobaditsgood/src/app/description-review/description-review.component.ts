import { Component , Input } from '@angular/core';
import { review } from '../display-review/review';

@Component({
  selector: 'app-description-review',
  templateUrl: './description-review.component.html',
  styleUrls: ['./description-review.component.css']
})
export class DescriptionReviewComponent {
  toggle = true;
  status = ''; 
   @Input() title = '';
   ngOnInit(): void {
    console.log(this.title);
   }

  enableDisableRule() {
      this.toggle = !this.toggle;
      this.status = this.toggle ? '' : 'Liked!';
  }
}
