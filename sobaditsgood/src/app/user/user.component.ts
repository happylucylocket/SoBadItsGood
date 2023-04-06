import { Router } from '@angular/router';
import { user } from './../user';
import { APIServiceService } from './../apiservice.service';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent {
   name:string="John"
   pic?:any="https://mdbcdn.b-cdn.net/img/new/avatars/2.webp"
   users?:user[]=[]
   constructor(private api:APIServiceService,private router:Router){
    this.users=this.api.getAll();
   }
   profile(user:user){
    location.href =`/userprofile/`+user.username?.toString()
   }
}
