import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class APIServiceService {

  constructor(private http: HttpClient) { }

  // Format movie name using '+' for spaces (ie: 'Mission+Impossible')
  searchMovie(movieName: string) {
    return this.http.get<Object>('https://api.themoviedb.org/3/search/movie?api_key=ecd28fb4488e17f072d95ad0278f2545&query='+ movieName).subscribe((data:any)=>{
      console.log(data);
    });
  }
}
