<<<<<<< HEAD
import { Component } from '@angular/core';
=======
import { Component, OnInit } from '@angular/core';
>>>>>>> a01c650173a87ac1bce5908cde8fa0d02ea38a80
import { APIServiceService } from './apiservice.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
<<<<<<< HEAD
export class AppComponent {
  tempMovie: any;
  data: any;
  constructor(private apiService: APIServiceService) {
    this.data = this.apiService.searchMovie('The+Room');
    this.tempMovie = this.data;
  }

=======
export class AppComponent implements OnInit {
  title = 'So Bad Its Good';

  constructor(private api: APIServiceService){}

  ngOnInit(): void {
    this.api.getData().subscribe(data =>{
      console.log(data);
    });
  }
>>>>>>> a01c650173a87ac1bce5908cde8fa0d02ea38a80
}
