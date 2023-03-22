import { PasswordDialogComponent } from './../password-dialog/password-dialog.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Component } from '@angular/core';
import * as md5 from 'md5';
import { DialogRef } from '@angular/cdk/dialog';

@Component({
  selector: 'settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent {
  constructor(private dialog:MatDialog){}
  userFirstName: String="Michaeel";
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
