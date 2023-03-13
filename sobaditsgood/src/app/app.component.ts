import { Component, OnInit } from '@angular/core';
import { APIServiceService } from './apiservice.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {

  title = 'So Bad Its Good';
  test: any;
  popularMovies: any[] = [];

  constructor(private api: APIServiceService){}

  ngOnInit(): void {

    this.api.getData().subscribe(data =>{
      console.log(data);
    });
    this.api.searchMovie(40016).subscribe(data => {
      console.log(JSON.parse(data).title);
      this.test = JSON.parse(data).title;
    })
    this.popularMovies = this.api.getMovies();
  }
}
