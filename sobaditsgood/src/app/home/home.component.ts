import { TitleCasePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { APIServiceService } from '../apiservice.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit{
  title!: string;
  posterPath!: string;
  topPicks: number[] = [];
  popularMovies: number[] = [];
  watchLater: number[] = [];

  constructor(private api: APIServiceService, private router: Router){
  }

  ngOnInit(): void {
    this.api.getData().subscribe(data =>{
      console.log(data);
    });
    this.topPicks = this.api.getTopPicks();
    this.popularMovies = this.api.getPopular();
    this.watchLater = this.api.getWatchLater();
  }
  
  getMovieTitle(movieNum:number):string
  {
    this.api.searchMovie(movieNum).subscribe(data => {
      return JSON.parse(data).title;
    })
    return "";
  }

  goToMovie(id:number) {
    this.router.navigate([`/movieinfo/${id}`]);
  }
}

