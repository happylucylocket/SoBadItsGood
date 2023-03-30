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
  myForm!: FormGroup;
  public description:string | undefined;
  public title: string | undefined;
  stars = [1, 2, 3, 4, 5];
  rating = 0;
  hoverState = 0;


  constructor(private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<DisplayReviewComponent>,
    @Inject(MAT_DIALOG_DATA) data: {}) {
      this.myForm = this.formBuilder.group({
        title: [''],
        description: [''],
      }) 
  }
  ngOnInit() {
    //this.form = this.fb;
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
    console.log("rating" + this.rating);
    console.log(this.myForm.value.description);
    console.log(this.myForm.value.title);
    this.dialogRef.close(this.myForm.value);
  }

  close() {
    this.dialogRef.close();
  }

}
