import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Inject } from '@angular/core';
import { Component } from '@angular/core';
import { MatFormField } from '@angular/material/form-field';
import { PasswordMatch } from './PasswordMatchValidator';

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
      newPassword: new FormControl('',[ ]),
      confirmPassword: new FormControl('',[])
    }
    )
  verify(){
    
    if(this.form.value?.oldPassword===this.password){
      this.verified=true
      this.form?.get('newPassword')?.setValidators([Validators.required]);
      this.form?.get('confirmPassword')?.setValidators([Validators.required,PasswordMatch(this.form)]);
      this.form?.get('oldPassword')?.removeValidators([Validators.required]);
      this.form?.updateValueAndValidity();
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
    this.verified=false;
    console.log(this.password)
    this.dialoRef.close(this.password);
  }
  keytab(event:any){
    let element = event.srcElement.nextElementSibling; // get the sibling element

    if(element == null)  // check if its null
        return;
    else
        element.focus();   // focus if not null
}
}
