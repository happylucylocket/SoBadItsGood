import { Component } from '@angular/core';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import { AddReviewComponent } from '../add-review/add-review.component';
import { APIServiceService } from '../apiservice.service';
import { ActivatedRoute } from '@angular/router';
import { Router, NavigationExtras } from '@angular/router';
import { review } from './review';
import { FormBuilder, FormGroup } from '@angular/forms';

interface Sorting {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-display-review',
  templateUrl: './display-review.component.html',
  styleUrls: ['./display-review.component.css']
})

export class DisplayReviewComponent {
  stars = [1, 2, 3, 4, 5];
  rating = 0;
  hoverState = 0;
  sorting: Sorting[] = [
    {value: 'date', viewValue: 'By Date'},
    {value: 'featured', viewValue: 'Featured'},
    {value: 'reviewrating', viewValue: 'Review Rating'},
  ];
  username = "";
  movieId!: number;
  reviews: review[] = [];
  session: boolean = false;
  myForm!: FormGroup;

  constructor(private router: Router, private formBuilder: FormBuilder, private dialogRef: MatDialog, private api: APIServiceService, private route: ActivatedRoute) {
    this.route.params.subscribe(params => {
      this.movieId = parseInt(params['movieid']);
    });
    this.myForm = this.formBuilder.group({
        username: '',
        title: [''],
        description: [''],
        rating: 0,
        movieId: this.movieId
    }) 
  }
  ngOnInit(): void {
    console.log(this.movieId);
   this.api.getReviews(this.movieId).subscribe((res:any) =>{
    for(var i=0;i<res.length;i++){
      this.reviews.push(new review(this.username,res[i].title,res[i].description,res[i].movieid,res[i].rating,res[i].date, res[i].likes))
    }
    });
    this.api.inInSession().subscribe(data=>{
      this.session = JSON.parse(JSON.stringify(data)).isInSession
      console.log(this.session);
    })
    //Display reviews user?
    this.api.getReviews(this.movieId).subscribe((res:any) =>{
      for(var i=0;i<res.length;i++){
        this.api.getUsername(res[i].userid).subscribe((res) =>{
          console.log(res);
          this.username = res;
          console.log("user" + this.username);
          this.reviews[i].username = this.username;
        });   
      }
    });
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
  ngAddReview()
  {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    this.dialogRef.open(AddReviewComponent, {
      width: '400px',
      maxHeight: '200vh',
      data: {
        movieId: this.movieId
      }}, );
  }
  rateMovie()
  {
    console.log("hello");
    if(this.session == true)
    {
      this.api.inInSession().subscribe((data) =>{
        console.log(data)
          this.session = JSON.parse(JSON.stringify(data));
          this.api.getCurrentUserInfo().subscribe((data) =>{
            this.username= JSON.parse(JSON.stringify(data))[0].username;
            this.myForm.value.username = this.username;
            this.myForm.value.rating = this.rating;
            this.api.addReview(this.myForm.value).subscribe((res)=>{
              console.log(res)
              return
            })
        }
        );
      }
      );
    } else 
    {
      this.router.navigate(['/login'])
    }
  }
}

