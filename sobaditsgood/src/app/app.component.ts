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
  constructor(private api: APIServiceService){}

  ngOnInit(): void {

    

    this.api.getData().subscribe(data =>{
      console.log(data);
    });
    this.api.searchMovie("The+Room").subscribe(data => {
      console.log(data);
      this.test = data;
    })
  }
}
