import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-max-mit-meter',
  templateUrl: './max-mit-meter.component.html',
  styleUrls: ['./max-mit-meter.component.scss']
})
export class MaxMitMeterComponent implements OnInit {

  @Input() minlabal = 'minlabal';
  @Input() maxlabal = 'maxlabal';
  constructor() { }

  ngOnInit(): void {
  }

}
