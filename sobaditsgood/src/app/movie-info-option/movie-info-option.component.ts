import { Component } from '@angular/core';
import { APIServiceService } from '../apiservice.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-movie-info-option',
  templateUrl: './movie-info-option.component.html',
  styleUrls: ['./movie-info-option.component.css']
})
export class MovieInfoOptionComponent {

  constructor(private api:APIServiceService, private route: ActivatedRoute){}

  session:Boolean = false

  favoriteClicked(){
    this.route.params.subscribe(params => {
      this.api.addFavMovie(params['movieid']).subscribe(data=>{
        console.log(data)
      })
    });
    console.log('Favourite Btn clicked');
  }

  watchedClicked()
  {
    console.log('Watched Btn clicked');
  }

  bookmarkClicked()
  {
    console.log('Bookmark Btn clicked');
  }
}
