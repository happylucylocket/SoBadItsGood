import { Component } from '@angular/core';
import { APIServiceService } from '../apiservice.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-movie-info-option',
  templateUrl: './movie-info-option.component.html',
  styleUrls: ['./movie-info-option.component.css']
})
export class MovieInfoOptionComponent {

  constructor(private api:APIServiceService, private router:Router){}

  session:Boolean = false

  favoriteClicked(){
    // this.router.navigate(['/movieinfo/options/:movieid'])
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
