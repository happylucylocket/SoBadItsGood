import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class APIServiceService {
  baseUrl:string = "http://34.72.53.185/sobaditsgood/api" // public api URL
  localBaseUrl:string = "http://localhost:3000/sobaditsgood/api" // for local testing purposes 

  // For retrieving images from the Movie Database
  base_urlMDB:string = "http://image.tmdb.org/t/p/"
  file_size:string = "original"
  
  // Test list of movie IDs
  topPicksIds = [314, 71880, 536869, 20196, 17473, 347626, 55563, 378236, 40016, 24528, 8966, 22345]
  popularIds:any[] = []
  watchLaterIds = [260928, 99847, 197599, 373841, 495507, 45649, 10196, 10696, 22293, 31246, 457712, 70821]

  currentMovieId: number = -1;

  constructor(private http: HttpClient) { }

  // for testing purposes
  getData(){
    return this.http.get(this.baseUrl, {responseType: 'text'});
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

  inInSession(){
    return this.http.get(this.baseUrl+'/isInSession', {responseType:'json', withCredentials: true})
  }

  login(data:any){
    sessionStorage.setItem('username', data.username);
    return this.http.post(this.baseUrl+'/login', data , {responseType: 'text', withCredentials: true})
  }

  getPopularFromDatabase() {
    return this.http.get(this.baseUrl+'/getPopular', {responseType: 'text'})
  }

  // Returns movie details corresponding to the id
  searchMovie(id: number) {
    return this.http.get('https://api.themoviedb.org/3/movie/'+id.toString()+'?api_key=ecd28fb4488e17f072d95ad0278f2545', {responseType: 'text'});
  }

  // Returns the movie's credits (cast + crew)
  getCredits(id: number) {
    return this.http.get('https://api.themoviedb.org/3/movie/'+id.toString()+"/credits"+'?api_key=ecd28fb4488e17f072d95ad0278f2545', {responseType: 'text'});

  }

  getTopPicks() {
    return this.topPicksIds;
  }

  getPopular() {
    this.popularIds = [];
    this.http.get(this.baseUrl+'/getPopular', {responseType: 'text'}).subscribe(data => {
      var movies = JSON.parse(data)
      for (var i = 0; i < movies.length; i++) {
        console.log(movies[i].movieid)
        this.popularIds.push(movies[i].movieid);
      }
    })
    return this.popularIds;
  }

  getWatchLater() {
    return this.watchLaterIds;
  }

  getPoster(poster_path:string) {
    return (this.base_urlMDB + this.file_size + poster_path)
  }

  setCurrentMovieId(id:number) {
    this.currentMovieId = id;
  }

  getCurrentMovieId() {
    return this.currentMovieId;
  }
}