import { Component , OnInit, Input, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-star',
  templateUrl: './star.component.html',
  styleUrls: ['./star.component.css']
})
export class StarComponent implements OnInit{
  @Input() starId: any;
  @Input() rating: any;

  @Output() starLeave: EventEmitter<number> = new EventEmitter();
  @Output() starEnter: EventEmitter<number> = new EventEmitter();
  @Output() starClick: EventEmitter<number> = new EventEmitter();
  constructor() {}

  ngOnInit() {
  }

  onEnterStar() {
    this.starEnter.emit(this.starId);
  }

  onLeaveStar() {
    this.starLeave.emit(this.starId);
  }

  starClicked() {
    this.starClick.emit(this.starId);
  }
}
