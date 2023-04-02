import { Component } from '@angular/core';
import { APIServiceService } from '../apiservice.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent{
  session:boolean | undefined;
  username:string | undefined;

  constructor(private api:APIServiceService){
    api.inInSession().subscribe(data=>{
      this.session = JSON.parse(JSON.stringify(data)).isInSession
      if(this.session == true){
        this.api.getUserInfo().subscribe(data=>{
          var a = JSON.parse(JSON.stringify(data))[0]
          this.username = a.username
          console.log(a)
        })
      }
    })
  }
}
