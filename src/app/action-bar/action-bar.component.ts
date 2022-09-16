import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-action-bar',
  templateUrl: './action-bar.component.html',
  styleUrls: ['./action-bar.component.scss']
})
export class ActionBarComponent implements OnInit {
  counter:number = 0;
  @Input() step:number = 1;
  @Output() numberChange = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
    
  }
  derease(){
    // console.log("Hey Thitiya");
    console.log('Hey derease')
    if(this.counter>0){
      this.counter = this.counter - this.step;
      this.numberChange.emit(this.counter);
    }
    // this.counter--;
  }
  increase(){
    if(this.counter<100){
      this.counter = this.counter + this.step;
      this.numberChange.emit(this.counter);
    }
    
  }
}
