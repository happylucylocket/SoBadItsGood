import { Component } from '@angular/core';
import { APIServiceService } from './apiservice.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  tempMovie: any;
  data: any;
  constructor(private apiService: APIServiceService) {
    this.data = this.apiService.searchMovie('The+Room');
    this.tempMovie = this.data;
  }

}
