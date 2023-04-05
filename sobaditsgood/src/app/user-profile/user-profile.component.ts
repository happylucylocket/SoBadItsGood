import { Component } from '@angular/core';
import { APIServiceService } from '../apiservice.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent{
  session:boolean | undefined;
  username:string | undefined;
  favorites:number[] = [];

  constructor(private api:APIServiceService, private route: ActivatedRoute){

    this.route.params.subscribe(params=>{
      api.getUserInfo(params['username']).subscribe(data=>{
        var userInfo = JSON.parse(JSON.stringify(data))
        console.log(userInfo.username)
        this.username = userInfo.username
      })
    })

    this.api.getFav().subscribe(data=>{
      console.log(data)
    })

    // this.api.searchMovie(this.movie).subscribe(data => {
    //   this.movieTitle= JSON.parse(data).title;
    // })

    // this.api.searchMovie(this.movie).subscribe(data => {
    //   this.moviePoster = this.api.getPoster(JSON.parse(data).poster_path);
    // })


    api.inInSession().subscribe(data=>{
      this.session = JSON.parse(JSON.stringify(data)).isInSession
    })
  }


}