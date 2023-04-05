import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, FormsModule } from '@angular/forms';
import { DisplayReviewComponent } from '../display-review/display-review.component';
import { APIServiceService } from '../apiservice.service';
import { ActivatedRoute, Router } from '@angular/router';

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
  session: boolean = false;
  username: string = '';
  constructor(private router: Router,private api: APIServiceService, private route: ActivatedRoute, private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<DisplayReviewComponent>,
    @Inject(MAT_DIALOG_DATA) data: any) {
      this.movieId = data.movieId;
      this.myForm = this.formBuilder.group({
        username: '',
        title: [''],
        description: [''],
        rating: 0,
        movieId: this.movieId
      }) 
    }
  ngOnInit() {
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
    this.myForm.value.rating = this.rating;
    //username, movieid, title, description, rating, postedOn
    this.api.inInSession().subscribe((data) =>{
        this.session = JSON.parse(JSON.stringify(data));
        this.api.getCurrentUserInfo().subscribe((data) =>{
          this.username= JSON.parse(JSON.stringify(data))[0].username;
          console.log(this.username);
          this.myForm.value.username = this.username;
          console.log(this.myForm.value);
          this.api.addReview(this.myForm.value).subscribe((res)=>{
            console.log(res)
            return
          })
      }
      );
    }
    );
    this.dialogRef.close(this.myForm.value);
    /*if(this.session == true)
    {
      this.api.addReview(this.myForm.value).subscribe((res)=>{
        console.log(res)
        return
      })
      this.dialogRef.close(this.myForm.value);
    } else 
    {
      this.dialogRef.close(this.myForm.value);
      this.router.navigate(['/login'])
    }*/
  }

  close() {
    this.dialogRef.close();
  }

}
