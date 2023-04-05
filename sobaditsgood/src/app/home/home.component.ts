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
  session: Boolean = false;

  constructor(private api: APIServiceService, private router: Router){
    this.api.inInSession().subscribe(data=>{
      this.session = JSON.parse(JSON.stringify(data)).isInSession
    })
  }

  ngOnInit(): void {
    this.topPicks = this.api.getTopPicks();
    this.popularMovies = this.api.getPopular();
    this.watchLater = this.api.getWatchLater();
  }

  goToMovie(id:number) {
    this.router.navigate([`/movieinfo/${id}`]);
  }
}

