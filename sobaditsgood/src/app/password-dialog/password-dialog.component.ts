import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Inject } from '@angular/core';
import { Component } from '@angular/core';
import { MatFormField } from '@angular/material/form-field';

@Component({
  selector: 'app-password-dialog',
  templateUrl: './password-dialog.component.html',
  styleUrls: ['./password-dialog.component.css']
})
export class PasswordDialogComponent {
  verified:boolean=false;
  password?:string
  constructor(
    private fb:FormBuilder,
    private dialoRef:MatDialogRef<PasswordDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data:any){
      this.password=data
    }
    form = new FormGroup({
      oldPassword: new FormControl('',Validators.required),
      newPassword: new FormControl('',[Validators.required]),
      confirmPassword: new FormControl('',[Validators.required])
    })
  
  verify(){
    
    if(this.form.value?.oldPassword===this.password){
      this.verified=true
    }
    else{
      // Create a custon validator for password incorrect
      console.log(this.form?.value?.oldPassword)
    }
  }
 
  save(){
    if(this.form?.value?.newPassword===this.form?.value?.confirmPassword){
      this.password=this.form?.value.newPassword as string;
      console.log("Password Changed Successfully")
      this.dialoRef.close(this.password)
    }
  }
  close(){
    this.dialoRef.close();
  }
}
