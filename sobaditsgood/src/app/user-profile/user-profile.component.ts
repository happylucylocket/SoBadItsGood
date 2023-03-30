import { Component } from '@angular/core';
import { APIServiceService } from '../apiservice.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent {

  constructor(private api:APIServiceService){
    api.inInSession().subscribe(data=>{
      console.log(data)
    })
  }

}
