import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { APIServiceService } from '../apiservice.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  myForm!: FormGroup;

  constructor(private formBuilder: FormBuilder, private api: APIServiceService, private router: Router) {
    this.myForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    })
  }

    onSubmit() {
      if (this.myForm.valid) {
        // Form is valid, submit the data
        console.log(this.myForm.value.username)
        this.api.isUserValid(this.myForm.value.username, this.myForm.value.password).subscribe(data =>{
          if(JSON.parse(data).isValid == false){
            alert("user does not exist. create an account.")
            return
          }
          console.log("welcome ", this.myForm.value.username)
          this.api.login(this.myForm.value).subscribe()
          this.api.inInSession().subscribe(data=>{
            console.log(data)
          })
          this.router.navigate(['/userprofile'])
        });
      } else {
        // Form is invalid, show error messages]
        alert("Field Cannot be empty")
      }
    }
    
}
