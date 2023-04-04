import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { APIServiceService } from '../apiservice.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.css']
})
export class CreateAccountComponent {
  myForm!: FormGroup;
  constructor(private formBuilder: FormBuilder, private api: APIServiceService, private router: Router){
    this.myForm = this.formBuilder.group({
      fname: ['', Validators.required],
      lname: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', Validators.required],
      email: ['', Validators.required]
    })
  }

  submit(){
    if(this.myForm.valid){
      //Check if user exists
      this.api.userExists(this.myForm.value.username).subscribe((res)=>{
        if(JSON.parse(JSON.stringify(res)).userExists == true){
          console.log("user exists")
          return
        }else{
          console.log('user does not exist')
          this.api.registerUser(this.myForm.value).subscribe((res)=>{
            console.log(res)
            this.router.navigate([`/login`]);
            return
          })
        }
      })
    }else{
      alert("All fields must be completed")
      console.log(this.myForm.valid)
    }
  }
}
