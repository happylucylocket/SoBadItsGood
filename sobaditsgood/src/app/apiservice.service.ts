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
    return this.http.get(this.localBaseUrl, {responseType: 'text'});
  }

  getUserInfo(){
    return this.http.get(this.localBaseUrl+`/getUserInfo`, {responseType:'json'})
  }

  //check if the user login is correct
  isUserValid(username:string, password:string){
    return this.http.get(this.localBaseUrl+`/isUserValid/${username}/${password}`, {responseType:'text'})
  }

  //add user to the database
  registerUser(user:any){
    return this.http.post(this.localBaseUrl+`/registerUser/`, user, { responseType: 'text' })
  }

  //check if the username is in the database or not
  userExists(username:string){
    return this.http.get(this.localBaseUrl+`/userExists/${username}`, {responseType: 'json'})
  }

  inInSession(){
    return this.http.get(this.localBaseUrl+'/isInSession', {responseType:'json', withCredentials: true})
  }

  login(data:any){
    return this.http.post(this.localBaseUrl+'/login', data , {responseType: 'text', withCredentials: true})
  }

  logout(){
    return this.http.get(this.localBaseUrl+'/logout', {responseType: 'text', withCredentials: true})
  }

  //add to favourite
  addFavMovie(movieId:string){
    return this.http.get(this.localBaseUrl+`/addfavourite/${movieId}`, {responseType:'text'})
  }

  //Check if movie has been favourited
  isFave(movieid:string){
    return this.http.get(this.localBaseUrl+`/isFav/${movieid}`, {responseType:'json'})
  }

  //remove from favourite
  unFavMovie(movieid:string){
    return this.http.get(this.localBaseUrl+`/removefavourite/${movieid}`, {responseType:'text'})
  }

  //if user watched the movie
  iswatched(movieid:string){
    return this.http.get(this.localBaseUrl+`/watched/${movieid}`, {responseType:'json'})
  }

  //add to watched movies
  addwatched(movieid:string){
    return this.http.get(this.localBaseUrl+`/addwatched/${movieid}`, {responseType:'text'})
  }

  //remove from watched movies
  removeWatched(movieid:string){
    return this.http.get(this.localBaseUrl+`/removewatched/${movieid}`, {responseType:'text'})
  }

  //if user watch listed the movie
  isWatchlisted(movieid:string){
    return this.http.get(this.localBaseUrl+`/watchlisted/${movieid}`, {responseType:'json'})
  }

  //add movie to watchlist
  addToWatchlist(movieid:string){
    return this.http.get(this.localBaseUrl+`/addtowatchlist/${movieid}`, {responseType:'text'})
  }

  removeFromWatchlist(movieid:string){
    return this.http.get(this.localBaseUrl+`/removedwatchlist/${movieid}`, {responseType:'text'})
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
    this.http.get(this.localBaseUrl+'/getPopular', {responseType: 'text'}).subscribe(data => {
      var movies = JSON.parse(data)
      for (var i = 0; i < movies.length; i++) {
        console.log(movies[i].movieid)
        this.popularIds.push(movies[i].movieid);
      }
    })
    return this.popularIds;
  }
  //check if the reviews is in the database or not
  getReviews(movieId:number){
    return this.http.get(this.localBaseUrl+`/getReviews/${movieId}`, {responseType: 'json'})
  }
  //check if the username is in the database or not
  addReview(review:any){
    return this.http.post(this.localBaseUrl+`/addReview/`, review, { responseType: 'text' })
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