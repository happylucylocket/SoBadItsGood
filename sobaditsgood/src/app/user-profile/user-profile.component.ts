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
  favorites_id:number[] = [];
  favorites:any[] = []

  constructor(private api:APIServiceService, private route: ActivatedRoute){

    //Getting Favourites
    this.route.params.subscribe(params=>{
      api.getUserInfo(params['username']).subscribe(data=>{
        var userInfo = JSON.parse(JSON.stringify(data))
        console.log(userInfo.username)
        this.username = userInfo.username
      })

      this.api.getFav(params['username']).subscribe(data=>{
        var movies = JSON.parse(JSON.stringify(data))
        if (movies.length > 3){
          for(var i = 0; i < 3; i++){
            this.favorites_id.push(movies[i].movieid)
          }
        }else{
          for(var i = 0; i < movies.length; i++){
            this.favorites_id.push(movies[i].movieid)
          }
        }
        for(var i = 0; i < this.favorites_id.length; i++){
          this.api.searchMovie(this.favorites_id[i]).subscribe(data => {
            var movies = JSON.parse(data)
            var poster = this.api.getPoster(JSON.parse(data).poster_path);
            movies.poster_path = poster
            this.favorites.push(movies)
          })
        }
        console.log(this.favorites)
      })
    })

    api.inInSession().subscribe(data=>{
      this.session = JSON.parse(JSON.stringify(data)).isInSession
    })
  }


}