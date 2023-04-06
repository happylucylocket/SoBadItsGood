import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-show-follows-dialog',
  templateUrl: './show-follows-dialog.component.html',
  styleUrls: ['./show-follows-dialog.component.css']
})
export class ShowFollowsDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any){}
}
