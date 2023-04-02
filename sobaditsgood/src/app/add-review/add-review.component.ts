import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, FormsModule } from '@angular/forms';
import { MatInputModule} from '@angular/material/input';
import { DisplayReviewComponent } from '../display-review/display-review.component';
import { APIServiceService } from '../apiservice.service';
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
  movieId!: number;

  constructor(private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<DisplayReviewComponent>,
    @Inject(MAT_DIALOG_DATA) data: {}, private api: APIServiceService) {
      this.myForm = this.formBuilder.group({
        title: [''],
        description: [''],
      }) 
  }
  ngOnInit() {
    this.movieId = this.api.getCurrentMovieId()
    console.log(this.movieId);
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
    console.log("Rating " + this.rating);
    console.log("Description " + this.myForm.value.description);
    console.log("Title " + this.myForm.value.title);
    console.log("Movie Id " + this.movieId);
    console.log(this.myForm.value);
    //username, movieid, title, description, rating, postedOn
    this.api.addReview(this.myForm.value).subscribe((res)=>{
      console.log(res)
      return
    })
    this.dialogRef.close(this.myForm.value);
  }

  close() {
    this.dialogRef.close();
  }

}
