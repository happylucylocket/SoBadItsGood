import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { APIServiceService } from '../apiservice.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  myForm!: FormGroup;

  constructor(private formBuilder: FormBuilder, private api: APIServiceService) {
    this.myForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    })
  }

    onSubmit() {
      if (this.myForm.valid) {
        // Form is valid, submit the data
        console.log(this.myForm.value.email)
        this.api.isUserValid(this.myForm.value.email, this.myForm.value.password).subscribe(data =>{
          if(JSON.parse(data).isValid == false){
            alert("user does not exist. create an account.")
          }
          console.log("welcome ", this.myForm.value.email)
        });
      } else {
        // Form is invalid, show error messages]
        alert("Field Cannot be empty")
      }
    }
    
}
