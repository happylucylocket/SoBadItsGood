import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, FormsModule } from '@angular/forms';
import { MatInputModule} from '@angular/material/input';
import { DisplayReviewComponent } from '../display-review/display-review.component';

@Component({
  selector: 'app-add-review',
  templateUrl: './add-review.component.html',
  styleUrls: ['./add-review.component.css']
})
export class AddReviewComponent implements OnInit {
  form: any;
  description:string | undefined;

  title: string | undefined;
  stars = [1, 2, 3, 4, 5];
  rating = 0;
  hoverState = 0;


  constructor(private fb: FormBuilder,
    private dialogRef: MatDialogRef<DisplayReviewComponent>,
    @Inject(MAT_DIALOG_DATA) data: {}) {
    
  }
  ngOnInit() {
    this.form = this.fb;
  }
  onEnterStar(starId:number) {
    this.hoverState = starId;
  }

  onLeaveStar() {
    this.hoverState = 0;
  }

  updateRating(starId:number) {
    this.rating = starId;
  }

  save() {
    this.dialogRef.close(this.form.value);
  }

  close() {
    this.dialogRef.close();
  }
}