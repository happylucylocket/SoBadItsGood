import { Component } from '@angular/core';
import { APIServiceService } from '../apiservice.service';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-movie-info-option',
  templateUrl: './movie-info-option.component.html',
  styleUrls: ['./movie-info-option.component.css']
})
export class MovieInfoOptionComponent {
  
  session:Boolean = false
  favourited:boolean = false
  watched:boolean = false
  watchlisted:boolean = false

  constructor(private api:APIServiceService, private route: ActivatedRoute, private routerURL:Router){
    this.api.inInSession().subscribe(data=>{
      this.session = JSON.parse(JSON.stringify(data)).isInSession
    })
    this.route.params.subscribe(params => {
      this.api.isFave(params['movieid']).subscribe((data)=>{
        this.favourited = JSON.parse(JSON.stringify(data)).isFave
      })

      this.api.iswatched(params['movieid']).subscribe(data=>{
        this.watched = JSON.parse(JSON.stringify(data)).watched
      })

      this.api.isWatchlisted(params['movieid']).subscribe((data)=>{
        this.watchlisted = JSON.parse(JSON.stringify(data)).watchlisted
      })
      
    });
  }


  favoriteClicked(){
    if(this.session == true){
      this.route.params.subscribe(params => {
        this.api.addFavMovie(params['movieid']).subscribe(data=>{
          this.favourited = true
        })
      });
    }else{
      this.routerURL.navigate(['/login'])
    }
  }

  unfavourite(){
    this.route.params.subscribe(params=>{
      this.api.unFavMovie(params['movieid']).subscribe(data=>{
        this.favourited = false
      })
    })
  }

  addWatched(){
    console.log(this.session)
    if(this.session == true){
      this.route.params.subscribe(params => {
        this.api.addwatched(params['movieid']).subscribe(data=>{
          this.watched = true
        })
      });
    }else{
      this.routerURL.navigate(['/login'])
    }
  }

  removeWatched(){
    this.route.params.subscribe(params=>{
      this.api.removeWatched(params['movieid']).subscribe(data=>{
        this.watched = false
      })
    })
  }

  addToWatchlist(){
    if(this.session == true){
      this.route.params.subscribe(params => {
        this.api.addToWatchlist(params['movieid']).subscribe(data=>{
          this.watchlisted = true
          console.log(data)
        })
      });
    }else{
      this.routerURL.navigate(['/login'])
    }
  }

  removeFromWatchlist(){
    this.route.params.subscribe(params=>{
      this.api.removeFromWatchlist(params['movieid']).subscribe(data=>{
        this.watchlisted = false
      })
    })
  }
}
