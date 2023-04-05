import { Component } from '@angular/core';
import { APIServiceService } from '../apiservice.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent{
  session:boolean | undefined;
  username:string | undefined;

  constructor(private api:APIServiceService){

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
      if(this.session == true){
        this.api.getUserInfo().subscribe(data=>{
          var a = JSON.parse(JSON.stringify(data))[0]
          this.username = a.username
          console.log(a)
        })
      }
    })
  }


}