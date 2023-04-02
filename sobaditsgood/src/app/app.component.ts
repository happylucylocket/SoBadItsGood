import { Component, OnInit } from '@angular/core';
import { APIServiceService } from './apiservice.service'; 
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {

  title = 'So Bad Its Good';
  session:boolean = false

  constructor(private api:APIServiceService, private router:Router){
    api.inInSession().subscribe(data=>{
      console.log(data)
      this.session = JSON.parse(JSON.stringify(data)).isInSession
    })
  }

  Logout(){
    this.api.logout().subscribe(data=>{
      console.log(data)
      this.router.navigate(['/login'])
    })
    window.location.reload()
  }
}
