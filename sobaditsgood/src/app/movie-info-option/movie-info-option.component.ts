import { Component } from '@angular/core';

@Component({
  selector: 'app-movie-info-option',
  templateUrl: './movie-info-option.component.html',
  styleUrls: ['./movie-info-option.component.css']
})
export class MovieInfoOptionComponent {
  favoriteClicked()
  {
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
