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
  averageRating = 0;
  hoverState = 0;
  sorting: Sorting[] = [
    {value: 'date', viewValue: 'By Date'},
    {value: 'featured', viewValue: 'Featured'},
    {value: 'reviewrating', viewValue: 'Review Rating'},
  ];
  username = "";
  movieId!: number;
  reviews: review[] = [];
  usernames: string[] = [];
  session: boolean = false;
  myForm!: FormGroup;
  userid: number = 0;
  hasReview: boolean = false;
  usernamer: string = "";
  starReview: boolean[] = [false,false,false,false,false];

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
      if(res[i].title != "" || res[i].description !=""){
      this.rating = res[i].rating
      for(let i = 0; i < this.rating; i++)
      {
          this.starReview[i] = true;
      }
        this.reviews.push(new review(this.username,res[i].title,res[i].description,res[i].movieid,res[i].rating,res[i].date, res[i].likes, this.starReview))}
    }
    });
    this.api.inInSession().subscribe(data=>{
      this.session = JSON.parse(JSON.stringify(data)).isInSession
      console.log(this.session);
    })
    // Display reviews user!
    this.api.getReviews(this.movieId).subscribe((res:any) =>{
      for(var i=0;i<res.length;i++){
        this.getUsernameFromID(res[i].userid);
      }
    });

    this.api.getRating(this.movieId).subscribe((data:any) => {
      console.log(data[0].rating);
      this.averageRating = data[0].rating;
    })
  }

  getUsernameFromID(id: number) {
    this.api.getUsername(id).subscribe((res) =>{
      this.usernames.push(res);
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
    if(this.session == true)
    {
      this.api.inInSession().subscribe((data) =>{
        console.log(data)
          this.session = JSON.parse(JSON.stringify(data));
          this.api.getCurrentUserInfo().subscribe((data) =>{
            this.usernamer= JSON.parse(JSON.stringify(data))[0].username;
            this.myForm.value.username = this.usernamer;
            this.myForm.value.rating = this.rating;
            console.log(JSON.parse(JSON.stringify(data))[0].userid);
            this.userid = JSON.parse(JSON.stringify(data))[0].userid;
            this.api.getReview(this.movieId, this.userid).subscribe((data) =>{
              console.log(JSON.parse(JSON.stringify(data)).hasReview);
              this.hasReview = JSON.parse(JSON.stringify(data)).hasReview;
              if(this.hasReview == false)
              {
                this.api.addReview(this.myForm.value).subscribe((res)=>{
                  console.log(res)
                  location.reload();
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
    } else 
    {
      this.router.navigate(['/login'])
    }
  }
}

