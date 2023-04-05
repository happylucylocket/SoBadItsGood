import { Component } from '@angular/core';
import { APIServiceService } from '../apiservice.service';
import { Router, ActivatedRoute, Route } from '@angular/router';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent{
  session:boolean | undefined;
  isFollowing:boolean | undefined;
  currentUserViewing:boolean | undefined
  username:string | undefined;
  numFollowing:number | undefined;
  numFollowers:number | undefined;
  favorites_id:number[] = [];
  watched_id:number[] = []
  watchlist_id:number[] = []
  favorites:any[] = []
  watched:any[] = []
  watchlist:any[] = []

  constructor(private api:APIServiceService, private route: ActivatedRoute, private navigateRoute:Router){
    this.route.params.subscribe(params=>{
      api.getUserInfo(params['username']).subscribe(data=>{
        var userInfo = JSON.parse(JSON.stringify(data))
        console.log(userInfo.username)
        this.username = userInfo.username
      })

      //Getting Favourites
      this.getFavourites(params['username'])

      //Getting Watched
      this.getWatched(params['username'])
      
      //Getting Watchlist
      this.getWatchlist(params['username'])

      //Following system
      this.FollowingSystem(params['username'])

      //get number of following
      this.getNumFollowing(params['username'])

      //get number of followers
      this.getNumFollowers(params['username'])
    })

    api.inInSession().subscribe(data=>{
      this.session = JSON.parse(JSON.stringify(data)).isInSession
    })
  }

  getFavourites(username:string){
    this.api.getFav(username).subscribe(data=>{
      var movies = JSON.parse(JSON.stringify(data))
      for(var i = 0; i < movies.length; i++){
        this.favorites_id.push(movies[i].movieid)
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
  }

  getWatched(username:string){
    this.api.getWatchedMovies(username).subscribe(data=>{
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
  }

  getWatchlist(username:string){
    this.api.getWatchlistedMovies(username).subscribe(data=>{
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
  }

  FollowingSystem(username:string){
    this.api.getCurrentUserInfo().subscribe(data=>{
      var currentUser = JSON.parse(JSON.stringify(data))[0]
      if(username == currentUser.username){
        this.currentUserViewing = true;
        return;
      }else{
        this.currentUserViewing = false
        this.api.isFollowing(currentUser.userid, username).subscribe(data=>{
          if(JSON.parse(JSON.stringify(data)).isFollowing == true){
            this.isFollowing = true
          }else{
            this.isFollowing = false
          }
        })
      }
    })
  }

  followUser(){
    if(this.session == false){
      this.navigateRoute.navigate(['/login'])
    }else{
      this.api.getCurrentUserInfo().subscribe(data=>{
        var currentUser = JSON.parse(JSON.stringify(data))[0]
        this.route.params.subscribe(params=>{
          this.api.followUser(currentUser.userid, params['username']).subscribe(data=>{
            console.log(data)
            this.isFollowing = true
          })
        })
      })
    }
  }

  unfollowUser(){
    if(this.session == false){
      this.navigateRoute.navigate(['/login'])
    }else{
      this.api.getCurrentUserInfo().subscribe(data=>{
        var currentUser = JSON.parse(JSON.stringify(data))[0]
        this.route.params.subscribe(params=>{
          this.api.unfollowUser(currentUser.userid, params['username']).subscribe(data=>{
            console.log(data)
            this.isFollowing = false
          })
        })
      })
    }
  }

  getNumFollowing(username:string){
    this.api.getNumFollowing(username).subscribe(data=>{
      this.numFollowing = JSON.parse(JSON.stringify(data)).NumFollowing
    })
  }

  getNumFollowers(username:string){
    this.api.getNumFollowers(username).subscribe(data=>{
      this.numFollowers = JSON.parse(JSON.stringify(data)).NumFollowing
    })
  }

}