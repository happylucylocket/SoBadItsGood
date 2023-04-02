import { PasswordDialogComponent } from './../password-dialog/password-dialog.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Component } from '@angular/core';
import * as md5 from 'md5';
import { APIServiceService } from '../apiservice.service';

@Component({
  selector: 'settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent {
  userFirstName: String="Michael";
  userLastName:String="Jackson";
  userEmail:string = "mj@gmail.com";
  password:string="Password@9";
  username:string = "michaeljackson09"
  readonlyFirstName:boolean = true
  readOnlyLastName:boolean=true
  readOnlyUsername:boolean=true
  readOnlyPswd:boolean=true
  isClass:boolean=true
  checkValue:boolean=true

  constructor(private dialog:MatDialog, private api:APIServiceService){
    api.getUserInfo().subscribe(data=>{
      var a = JSON.parse(JSON.stringify(data))[0]
          this.username = a.username
          this.userFirstName = a.fname
          this.userLastName = a.lname
          this.userEmail = a.email
          this.password = a.password
          console.log(a)
    })
  }

  getPswd():String {
    return md5(this.password);
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

}
