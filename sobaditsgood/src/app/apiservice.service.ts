import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class APIServiceService {
  baseUrl:string = "http://34.123.216.237/sobaditsgood/api"

  // For retrieving images from the Movie Database
  base_urlMDB:string = "http://image.tmdb.org/t/p/"
  file_size:string = "original"
  
  // Test list of movies
  movieList = [
    {
      "id": 40016,
      "overview": "A platoon of eagles and vultures attacks the residents of a small town. Many people die. It's not known what caused the flying menace to attack. Two people manage to fight back, but will they survive Birdemic?",
      "poster_path": "/gqmcAVNNUosB55RliecFYnkWT4M.jpg",
      "title": "Birdemic: Shock and Terror",
      "vote_average": 2.1
    },
    {
      "id": 934433,
      "title": "Scream VI",
      "overview": "Following the latest Ghostface killings, the four survivors leave Woodsboro behind and start a fresh chapter.",
      "poster_path": "/t2NEaFrNFRCrBIyAETlz5sqq15H.jpg",
      "vote_average": 7.478,
    }
  ]
  movieIds = [40016, 188489, 724585, 24528, 307124, 582913, 8966, 18239, 24021, 50619, 50620, 205321,
              248504, 331446, 390989, 438970, 523849]

  constructor(private http: HttpClient) { }

  // for testing purposes
  getData(){
    return this.http.get(this.baseUrl, {responseType: 'text'});
  }

  // Returns movie details corresponding to the id
  searchMovie(id: number) {
    return this.http.get('https://api.themoviedb.org/3/movie/'+id.toString()+'?api_key=ecd28fb4488e17f072d95ad0278f2545', {responseType: 'text'});
  }

  getPopularMovies() {
    return this.http.get<Object>('https://api.themoviedb.org/3/trending/movie/day?api_key=ecd28fb4488e17f072d95ad0278f2545');
  }

  getMovies() {
    return this.movieIds;
  }

  getPoster(poster_path:string) {
    return (this.base_urlMDB + this.file_size + poster_path)
  }
}
