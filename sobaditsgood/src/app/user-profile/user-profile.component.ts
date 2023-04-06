import { review } from '../review';
import { Component } from '@angular/core';
import { APIServiceService } from '../apiservice.service';
import { Router, ActivatedRoute, Route } from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import { ShowFollowsDialogComponent } from '../show-follows-dialog/show-follows-dialog.component';

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
  numFollowing!: number;
  numFollowers!: number;
  favorites_id:number[] = [];
  watched_id:number[] = []
  watchlist_id:number[] = []
  favorites:any[] = []
  watched:any[] = []
  watchlist:any[] = []
  pic?:any="https://mdbcdn.b-cdn.net/img/new/avatars/2.webp"
  reviews:review[]=[]

  constructor(private api:APIServiceService, private route: ActivatedRoute, private navigateRoute:Router, public dialog: MatDialog){
    this.route.params.subscribe(params=>{
      api.getUserInfo(params['username']).subscribe(data=>{
        var userInfo = JSON.parse(JSON.stringify(data))
        console.log(userInfo.username)
        this.username = userInfo.username
        this.pic=userInfo.profilepic    
      })
      if(this.username!==null){
        this.api.getUserReviews(params['username']).subscribe((data:any)=>{
          console.log(data)
          for(var i=0;i<data.length;i++){
            if(data[i].title!="")
            this.reviews.push(new review(data[i].userid,data[i].movieid,data[i].title,data[i].description,data[i].rating,data[i].likes,data[i].created_at))
          }
        })
      }
      console.log(this.reviews)
    
    

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
            this.numFollowers++;
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
            this.numFollowers--;
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

  seeFollowing() {
    this.route.params.subscribe(params=>{
      this.api.getFollowingInfo(params['username']).subscribe(data=>{
        if(JSON.parse(JSON.stringify(data)).length == 0){
          alert("User is not following anyone")
        }else{
          const dialogRef = this.dialog.open(ShowFollowsDialogComponent, {
            width:'400px',
            data:{
              title:"Following",
              followers:JSON.parse(JSON.stringify(data))
            }
          });
        }
      })
    })

  }

  seeFollowers(){
    this.route.params.subscribe(params=>{
      this.api.getFollowerInfo(params['username']).subscribe(data=>{
        console.log(data)
        if(JSON.parse(JSON.stringify(data)).length == 0){
          alert("user has not followers")
        }else{
          const dialogRef = this.dialog.open(ShowFollowsDialogComponent, {
            width:'400px',
            data:{
              title:"Followers",
              followers:JSON.parse(JSON.stringify(data))
            }
          });
        }
      })
    })
  }
}