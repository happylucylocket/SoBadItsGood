import { Component } from '@angular/core';
import { APIServiceService } from '../apiservice.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-display-my-reviews',
  templateUrl: './display-my-reviews.component.html',
  styleUrls: ['./display-my-reviews.component.css']
})
export class DisplayMyReviewsComponent {
  reviewInfo:any[] = []
  stars:any[] = []

  constructor(private api:APIServiceService, private routerURL:Router, private router:ActivatedRoute){
    this.router.params.subscribe(params=>{
      this.api.getUserReviews(params['username']).subscribe(data=>{
        var d = JSON.parse(JSON.stringify(data))
        for(var i = 0; i < d.length; i++){
          this.reviewInfo.push(d[i])
        }
        for(var i = 0; i < d.length; i++){
            this.stars.push([])
            for(var j = 0; j < d[i].rating; j++){
              this.stars[i].push(j+1)
            }
        }
        console.log(this.stars)
      })
    })
  }

}
