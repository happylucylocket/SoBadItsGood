import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class APIServiceService {
  baseUrl:string = "http://34.123.216.237/sobaditsgood/api"
  localBaseUrl:string = "http://localhost:3000/sobaditsgood/api" // for local testing purposes 

  // For retrieving images from the Movie Database
  base_urlMDB:string = "http://image.tmdb.org/t/p/"
  file_size:string = "original"
  
  // Test list of movie IDs
  topPicksIds = [40016, 188489, 724585, 24528, 307124, 17473, 8966, 18239, 24021, 50619, 50620, 55563]
  popularIds = [205321, 248504, 331446, 390989, 438970, 523849]
  watchLaterIds = [378236, 260928, 99847, 197599, 373841, 495507, 1062226, 45649]

  constructor(private http: HttpClient) { }

  // for testing purposes
  getData(){
    return this.http.get(this.baseUrl+'/api', {responseType: 'text'});
  }

  //check if the user login is correct
  isUserValid(username:string, password:string){
    return this.http.get(this.baseUrl+`/isUserValid/${username}/${password}`, {responseType:'text'})
  }

  //add user to the database
  registerUser(user:any){
    return this.http.post(this.baseUrl+`/registerUser/`, user, { responseType: 'text' })
  }

  //check if the username is in the database or not
  userExists(username:string){
    return this.http.get(this.baseUrl+`/userExists/${username}`, {responseType: 'json'})
  }

  // Returns movie details corresponding to the id
  searchMovie(id: number) {
    return this.http.get('https://api.themoviedb.org/3/movie/'+id.toString()+'?api_key=ecd28fb4488e17f072d95ad0278f2545', {responseType: 'text'});
  }

  // getPopularMovies() {
  //   return this.http.get<Object>('https://api.themoviedb.org/3/trending/movie/day?api_key=ecd28fb4488e17f072d95ad0278f2545');
  // }

  getTopPicks() {
    return this.topPicksIds;
  }

  getPopular() {
    return this.popularIds;
  }

  getWatchLater() {
    return this.watchLaterIds;
  }

  getPoster(poster_path:string) {
    return (this.base_urlMDB + this.file_size + poster_path)
  }
}
