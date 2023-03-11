import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class APIServiceService {

  baseUrl:string = "http://localhost:3000"

  constructor(private http:HttpClient){}

  // for testing purposes
  getData(){
    return this.http.get(this.baseUrl+'/api', {responseType: 'text'});
  }
}
