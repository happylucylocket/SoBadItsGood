import { FormBuilder, FormGroup } from '@angular/forms';
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
  form?:FormGroup
  constructor(
    private fb:FormBuilder,
    private dialoRef:MatDialogRef<PasswordDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data:any){
      this.password=data
    }
    ngOnInit(){
      this.form=new FormGroup({
        
      });
    }
  
  verify(oldPassword:any){
    
    if(oldPassword?.value === this.password){
      this.verified=!this.verified
    }
    else{
      console.log(this.password)
    }
  }
}
