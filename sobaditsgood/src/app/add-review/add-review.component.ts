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
  userid: number = 0;
  hasReview: boolean = false;

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
    this.api.inInSession().subscribe(data=>{
      this.session = JSON.parse(JSON.stringify(data)).isInSession
      console.log(this.session);
    })
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
    this.myForm.value.rating = this.rating;
    //username, movieid, title, description, rating, postedOn
    this.dialogRef.close(this.myForm.value);
    if(this.session == true)
    {

      this.api.inInSession().subscribe((data) =>{
        console.log(data)
          this.session = JSON.parse(JSON.stringify(data));
          this.api.getCurrentUserInfo().subscribe((data) =>{
            this.username= JSON.parse(JSON.stringify(data))[0].username;
            console.log(this.username);
            this.myForm.value.username = this.username;
            console.log(this.myForm.value);

            console.log(JSON.parse(JSON.stringify(data))[0].userid);
            this.userid = JSON.parse(JSON.stringify(data))[0].userid;
            this.api.getReview(this.movieId, this.userid).subscribe((data) =>{
              console.log(JSON.parse(JSON.stringify(data)).hasReview);
              this.hasReview = JSON.parse(JSON.stringify(data)).hasReview;
              if(this.hasReview == false)
              {
                this.api.addReview(this.myForm.value).subscribe((res)=>{
                  console.log(res)
                  return
                })
              } else
              {
                alert('You have already written a review!');
              }
          })
        }
        );
      }
      );
      this.dialogRef.close(this.myForm.value);
    } else 
    {
      this.dialogRef.close(this.myForm.value);
      this.router.navigate(['/login'])
    }
  }

  close() {
    this.dialogRef.close();
  }

}
