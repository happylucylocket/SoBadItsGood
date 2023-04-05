import { PasswordDialogComponent } from './../password-dialog/password-dialog.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Component } from '@angular/core';
import * as md5 from 'md5';
import { APIServiceService } from '../apiservice.service';
import { FormGroup, FormControl, Validators, EmailValidator } from '@angular/forms';
import { user } from '../user';
import { EmailUsed } from './EmailCheckValidator';
import { UsernameUsed } from './UsernameCheckValidator';
import { ActivatedRoute, Route, Router, RouterLink } from '@angular/router';

@Component({
  selector: 'settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent {
  userFirstName?: String="";
  userLastName?:String="";
  userEmail?:string = "";
  emailCheck?:string="check"
  usernameCheck?:string="check"
  password?:string="";
  username?:string = ""
  id?:number=1
  readonlyFirstName:boolean = true
  readOnlyLastName:boolean=true
  readOnlyUsername:boolean=true
  readOnlyPswd:boolean=true
  readOnlyEmail:boolean=true
  isClass:boolean=true
  checkValue:boolean=true
  form = new FormGroup({
    userFirstName:new FormControl('',Validators.required),
    userLastName: new FormControl('',Validators.required),
    username: new FormControl('',Validators.required),
    userEmail: new FormControl('',[Validators.required]),
    password: new FormControl('',Validators.required)
  }
  )
 
  constructor(private dialog:MatDialog, private api:APIServiceService, private route : Router){
    api.getCurrentUserInfo().subscribe( data=>{
      var a = JSON.parse(JSON.stringify(data))[0]
          this.username = a.username
          this.userFirstName = a.fname
          this.userLastName = a.lname
          this.userEmail = a.email
          this.emailCheck=a.email
          this.password = a.password
          this.id = a.userid
          // console.log(a)
    })
  }

  verifyEmail(){
    if(this.userEmail!==this.emailCheck){   
      this.form?.get('userEmail')?.addValidators([EmailUsed(this.form,this.api.getAll()!!,this.emailCheck!!)]);
      this.form?.updateValueAndValidity();
    }
  
  }
  verifyUsername(){
    if(this.username!==this.usernameCheck){   
      this.form?.get('username')?.addValidators([UsernameUsed(this.form,this.api.getAll()!!,this.usernameCheck!!)]);
      this.form?.updateValueAndValidity();
    }
  
  }

  fnameEdit(){
    this.readonlyFirstName=!this.readonlyFirstName
   if(this.checkValue==true)
   this.checkValue=!this.checkValue
  }
  lnameEdit(){
    this.readOnlyLastName=!this.readOnlyLastName
    if(this.checkValue==true)
   this.checkValue=!this.checkValue
  }
  usernameEdit(){
    this.readOnlyUsername=!this.readOnlyUsername
    if(this.checkValue==true)
   this.checkValue=!this.checkValue
  }
  emailEdit(){
    this.readOnlyEmail=!this.readOnlyEmail
    if(this.checkValue==true)
   this.checkValue=!this.checkValue
  }

  changePswd(){
    if(this.checkValue==true)
    this.checkValue=!this.checkValue
    const dialogConfig = new
     MatDialogConfig();
   
    const dialogRef = this.dialog.open(PasswordDialogComponent,{
      width:'500px',
      height:'350px',
      panelClass: 'bg-color' ,
      disableClose:true,
      autoFocus:true,
      data:this.password
      
    })
    dialogRef.afterClosed().subscribe(
      (data)=>  this.password=data,
    )
    
    

  }
   submit(){
    this.api.updateUserInfo(new user(this.id,this.form.value.userFirstName?.toString(),this.form.value.userLastName?.toString(),this.form.value.username?.toString(),this.form.value.userEmail?.toString(),this.form.value.password?.toString())).subscribe()
      window.alert("Logging out! Please Login Again!!")
    this.route.navigate(['/login']);
  }

}
