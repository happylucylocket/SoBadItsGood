import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { response } from 'express';
import { user } from './user';

@Injectable({
  providedIn: 'root'
})
export class APIServiceService {
  baseUrl:string = "http://34.72.53.185/sobaditsgood/api" // public api URL
  localBaseUrl:string = "http://localhost:3000/sobaditsgood/api" // for local testing purposes 
  users?:user[]=[]

  // For retrieving images from the Movie Database
  base_urlMDB:string = "http://image.tmdb.org/t/p/"
  file_size:string = "original"
  
  // Test list of movie IDs
  // topPicksIds = [314, 71880, 536869, 20196, 17473, 347626, 55563, 378236, 40016, 24528, 8966, 22345]
  topPicksIds:number[] = [];
  popularIds:number[] = [];
  watchLaterIds:number[] = [];
  favoriteIds:number[] = [];
  searchIds: number[] =[];

  constructor(private http: HttpClient) { }

  getAll(){
     this.http.get(this.baseUrl+`/getAll`).subscribe((data:any)=>{
       for(var i=0;i<data.length;i++){
         this.users?.push(new user(data[i].userid,data[i].fname,data[i].lname,data[i].username,data[i].email,data[i].password,data[i].profilepic))
       }
     });
     return  this.users
  }
  // for testing purposes
  getData(){
    return this.http.get(this.baseUrl, {responseType: 'text'});
  }

  getCurrentUserInfo(){
    return this.http.get(this.baseUrl+`/getCurrentUserInfo`, {responseType:'json'})
  }

  getUserInfo(username:string){
    return this.http.get(this.baseUrl+`/getUserInfo/${username}`, {responseType:'json'})
  }
  updateUserInfo(user:user){
    return this.http.post(this.baseUrl+`/updateInfo/`, user, { responseType: 'text' })
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
    return this.http.post(this.baseUrl+'/login', data , {responseType: 'text', withCredentials: true})
  }

  logout(){
    return this.http.get(this.baseUrl+'/logout', {responseType: 'text', withCredentials: true})
  }

  //add to favourite
  addFavMovie(movieId:string){
    return this.http.get(this.baseUrl+`/addfavourite/${movieId}`, {responseType:'text'})
  }

  //Check if movie has been favourited
  isFave(movieid:string){
    return this.http.get(this.baseUrl+`/isFav/${movieid}`, {responseType:'json'})
  }

  //remove from favourite
  unFavMovie(movieid:string){
    return this.http.get(this.baseUrl+`/removefavourite/${movieid}`, {responseType:'text'})
  }

  getFav(username:string){
    return this.http.get(this.baseUrl+`/getfavMovies/${username}`, {responseType:'json'})
  }

  getWatchedMovies(username:string){
    return this.http.get(this.baseUrl+`/getWatchedMovies/${username}`, {responseType:'json'})
  }

  getWatchlistedMovies(username:string){
    return this.http.get(this.baseUrl+`/getWatchlistedMovies/${username}`, {responseType:'json'})
  }

  //if user watched the movie
  iswatched(movieid:string){
    return this.http.get(this.baseUrl+`/watched/${movieid}`, {responseType:'json'})
  }

  //add to watched movies
  addwatched(movieid:string){
    return this.http.get(this.baseUrl+`/addwatched/${movieid}`, {responseType:'text'})
  }

  //remove from watched movies
  removeWatched(movieid:string){
    return this.http.get(this.baseUrl+`/removewatched/${movieid}`, {responseType:'text'})
  }

  //if user watch listed the movie
  isWatchlisted(movieid:string){
    return this.http.get(this.baseUrl+`/watchlisted/${movieid}`, {responseType:'json'})
  }

  //add movie to watchlist
  addToWatchlist(movieid:string){
    return this.http.get(this.baseUrl+`/addtowatchlist/${movieid}`, {responseType:'text'})
  }

  removeFromWatchlist(movieid:string){
    return this.http.get(this.baseUrl+`/removedwatchlist/${movieid}`, {responseType:'text'})
  }

  isFollowing(userid:number, followingUsername:string){
    return this.http.get(this.baseUrl+`/isFollowing/${userid}/${followingUsername}`, {responseType:'json'})
  }

  followUser(userid:number, followingUsername:string){
    return this.http.get(this.baseUrl+`/followUser/${userid}/${followingUsername}`, {responseType:'text'})
  }

  unfollowUser(userid:number, unfollowUsername:string){
    return this.http.get(this.baseUrl+`/unfollowUser/${userid}/${unfollowUsername}`, {responseType:'text'})
  }

  getNumFollowing(username:string){
    return this.http.get(this.baseUrl+`/getNumFollowing/${username}`, {responseType:'json'})
  }

  getNumFollowers(username:string){
    return this.http.get(this.baseUrl+`/getNumFollowers/${username}`, {responseType:'json'})
  }

  getFollowingInfo(username:string){
    return this.http.get(this.baseUrl+`/getFollowingInfo/${username}`, {responseType:'json'})
  }

  getFollowerInfo(username:string){
    return this.http.get(this.baseUrl+`/getFollowerInfo/${username}`, {responseType:'json'})
  }

  getUserReviews(username:string){
    return this.http.get(this.baseUrl+`/getUserReviews/${username}`, {responseType:'json'})
  }

  searchForAMovie(id: string) {
    return this.http.get('https://api.themoviedb.org/3/search/movie?api_key=ecd28fb4488e17f072d95ad0278f2545'+'&language=en-US&page=1&include_adult=false&query=' +id.toString(), {responseType: 'json'});
  }
  getMovies(search: string) {
    this.searchIds = [];
    this.http.get(this.baseUrl+`/getMovies/${search}`, {responseType: 'text'}).subscribe(data => {
      var movies = JSON.parse(data)
      for (var i = 0; i < movies.length; i++) {
        this.searchIds.push(movies[i].movieid);
      }
    })
    return this.searchIds;
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
    this.topPicksIds = [];
    this.http.get(this.baseUrl+'/getTop', {responseType: 'text'}).subscribe(data => {
      var movies = JSON.parse(data)
      for (var i = 0; i < movies.length; i++) {
        this.topPicksIds.push(movies[i].movieid);
      }
    })
    return this.topPicksIds;
  }
  getUsername(userid:number)
  {
    return this.http.get(this.baseUrl+`/getUsername/${userid}`, {responseType:'text'})
  }
  getPopular() {
    this.popularIds = [];
    this.http.get(this.baseUrl+'/getPopular', {responseType: 'text'}).subscribe(data => {
      var movies = JSON.parse(data)
      for (var i = 0; i < movies.length; i++) {
        this.popularIds.push(movies[i].movieid);
      }
    })
    return this.popularIds;
  }

  getWatchLater() {
    this.watchLaterIds = [];
    this.http.get(this.baseUrl+'/getWatchlist', {responseType: 'text'}).subscribe(data => {
      var movies = JSON.parse(data)
      for (var i = 0; i < movies.length; i++) {
        this.watchLaterIds.push(movies[i].movieid);
      }
    })
    return this.watchLaterIds;
  }

  getFavorites() {
    this.favoriteIds = [];
    this.http.get(this.baseUrl+'/getFavourites', {responseType: 'text'}).subscribe(data => {
      var movies = JSON.parse(data)
      for (var i = 0; i < movies.length; i++) {
        this.favoriteIds.push(movies[i].movieid);
      }
    })
    return this.favoriteIds;
  }

  getPoster(poster_path:string) {
    return (this.base_urlMDB + this.file_size + poster_path)
  }

  //check if the reviews is in the database or not
  getReviews(movieId:number){
    return this.http.get(this.baseUrl+`/getReviews/${movieId}`, {responseType: 'json'})
  }
  //check if the username is in the database or not
  addReview(review:any){
    return this.http.post(this.baseUrl+`/addReview/`, review, { responseType: 'text' })
  }

  getRating(movieId: number) {
    return this.http.get(this.baseUrl+`/getRating/${movieId}`, {responseType: 'json'})
  }
  //check if the reviews is in the database or not
  getReview(userId:number, movieId:number){
    return this.http.get(this.baseUrl+`/getReview/${movieId}/${userId}`, {responseType: 'json'})
  }
}