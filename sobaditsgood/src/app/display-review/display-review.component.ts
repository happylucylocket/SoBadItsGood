import { Component } from '@angular/core';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import { AddReviewComponent } from '../add-review/add-review.component';
import { APIServiceService } from '../apiservice.service';
import { ActivatedRoute } from '@angular/router';
import { Router, NavigationExtras } from '@angular/router';
import { review } from './review';

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
  movieId!: number;
  reviews: review[] = [];
  
  constructor(private dialogRef: MatDialog, private api: APIServiceService, private route: ActivatedRoute) {
    this.route.params.subscribe(params => {
      this.movieId = parseInt(params['movieid']);
    });
  }
  ngOnInit(): void {
    console.log(this.movieId);
   this.api.getReviews(this.movieId).subscribe((res:any) =>{
    for(var i=0;i<res.length;i++){
      this.reviews.push(new review(res[i].userid,res[i].title,res[i].description,res[i].movieid,res[i].rating,res[i].date, res[i].likes))
    }
    console.log(this.reviews[0].title);
    });
  }
/*this.http.get(this.localBaseUrl+`/getAll`).subscribe((data:any)=>{
       for(var i=0;i<data.length;i++){
         this.users?.push(new user(data[i].userid,data[i].fname,data[i].lname,data[i].username,data[i].email,data[i].password))
       }
     });
return  this.users*/
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
    console.log(this.rating);
  }
}

