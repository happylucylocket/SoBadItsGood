import { Component } from '@angular/core';
import { APIServiceService } from '../apiservice.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-movie-info-option',
  templateUrl: './movie-info-option.component.html',
  styleUrls: ['./movie-info-option.component.css']
})
export class MovieInfoOptionComponent {
  
  session:Boolean = false
  favourited:boolean = false
  watched:boolean = false
  bookmarked:boolean = false

  constructor(private api:APIServiceService, private route: ActivatedRoute){
    this.route.params.subscribe(params => {
      this.api.isFave(params['movieid']).subscribe((data)=>{
        this.favourited = JSON.parse(JSON.stringify(data)).isFave
      })

      this.api.iswatched(params['movieid']).subscribe(data=>{
        this.watched = JSON.parse(JSON.stringify(data)).watched
        console.log(data)
      })
      
    });
  }


  favoriteClicked(){
    this.route.params.subscribe(params => {
      this.api.addFavMovie(params['movieid']).subscribe(data=>{
        this.favourited = true
      })
    });
  }

  unfavourite(){
    this.route.params.subscribe(params=>{
      this.api.unFavMovie(params['movieid']).subscribe(data=>{
        this.favourited = false
      })
    })
  }

  addWatched(){
    this.route.params.subscribe(params => {
      this.api.addwatched(params['movieid']).subscribe(data=>{
        this.watched = true
        console.log(data)
      })
    });
  }

  removeWatched(){
    this.route.params.subscribe(params=>{
      this.api.removeWatched(params['movieid']).subscribe(data=>{
        this.watched = false
        console.log(data)
      })
    })
  }

  bookmarkClicked()
  {
    console.log('Bookmark Btn clicked');
  }

  removeBookmark(){

  }
}
