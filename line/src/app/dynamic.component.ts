import { Component } from '@angular/core';
import { NgModel } from '@angular/forms';
@Component({
  selector: 'app-dynamic',
  template: `<div>
  <div>
    <label>x</label><input type="number"   min="0" max="300" [ngModel]="x">
    </div>
    <div><button (click)="addP(7)">add point</button></div>
  </div>`,
})
/*
export class P{
	
	constructor(
	
	){}
}*/
export class DynamicComponent {
	//p: P = new P(4);
	x: number =0;
  addP(x: number) {
   // alert(x);
  }
}
