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
  watched_id:number[] = []
  watchlist_id:number[] = []
  favorites:any[] = []
  watched:any[] = []
  watchlist:any[] = []

  constructor(private api:APIServiceService, private route: ActivatedRoute){
    this.route.params.subscribe(params=>{
      api.getUserInfo(params['username']).subscribe(data=>{
        var userInfo = JSON.parse(JSON.stringify(data))
        console.log(userInfo.username)
        this.username = userInfo.username
      })

      //Getting Favourites
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
      })

      //Getting Watched
      this.api.getWatchedMovies(params['username']).subscribe(data=>{
        var movies = JSON.parse(JSON.stringify(data))
        if (movies.length > 3){
          for(var i = 0; i < 3; i++){
            this.watched_id.push(movies[i].movieid)
          }
        }else{
          for(var i = 0; i < movies.length; i++){
            this.watched_id.push(movies[i].movieid)
          }
        }
        for(var i = 0; i < this.watched_id.length; i++){
          this.api.searchMovie(this.watched_id[i]).subscribe(data => {
            var movies = JSON.parse(data)
            var poster = this.api.getPoster(JSON.parse(data).poster_path);
            movies.poster_path = poster
            this.watched.push(movies)
          })
        }
      })

      //Getting Watchlist
      this.api.getWatchlistedMovies(params['username']).subscribe(data=>{
        var movies = JSON.parse(JSON.stringify(data))
        if (movies.length > 3){
          for(var i = 0; i < 3; i++){
            this.watchlist_id.push(movies[i].movieid)
          }
        }else{
          for(var i = 0; i < movies.length; i++){
            this.watchlist_id.push(movies[i].movieid)
          }
        }
        for(var i = 0; i < this.watchlist_id.length; i++){
          this.api.searchMovie(this.watchlist_id[i]).subscribe(data => {
            var movies = JSON.parse(data)
            var poster = this.api.getPoster(JSON.parse(data).poster_path);
            movies.poster_path = poster
            this.watchlist.push(movies)
          })
        }
      })
    })

    api.inInSession().subscribe(data=>{
      this.session = JSON.parse(JSON.stringify(data)).isInSession
    })
  }


}