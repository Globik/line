import {
  Component,
  ViewContainerRef,
  ViewChild,
  ElementRef,
  AfterViewInit,
  ComponentRef,
} from '@angular/core';
import { FormGroup, FormControl, FormArray } from '@angular/forms';
import { DynamicComponent } from './dynamic.component';

@Component({
  selector: 'line1-app',
  templateUrl: './line1.component.html',
})
export class Line1Component implements AfterViewInit {
  @ViewChild('canvasEl', {static: false}) canvas: ElementRef<HTMLCanvasElement>;
  @ViewChild('dynamic', {read: ViewContainerRef})
  private viewRef: ViewContainerRef;
  private componentRef: ComponentRef<DynamicComponent>;
  
  private ctx: CanvasRenderingContext2D | null;
   randomPoints: any = [];
  ngAfterViewInit(): void {
	  
	  this.ctx = this.canvas.nativeElement.getContext('2d');
	  if(this.ctx){
	 // this.ctx.arc(200, 200, 80,0,2 * Math.PI, false);
	  //this.ctx.stroke();
	 //let randomPoints = [];//new Array(10);
	  
	  for(let i=0;i< 11;i++){
		  this.randomPoints.push({x: Math.floor(Math.random() * 300), y:Math.floor(Math.random()*300)});
	  }
	  //console.log(randomPoints);
	 // this.ctx.clearRect(0, 0, this.canvas.nativeElement.width, this.canvas.nativeElement.height);
	  this.randomPoints.forEach((el:any, i:number)=> {
		  if(this.ctx){
			  this.ctx.fillStyle="red";
			  this.ctx.fillRect(el.x, el.y, 4, 4)
			  
		  }
		  });
		  
		 // let sorted = sortedArray(randomPoints);
		
        //this.drawLine(sorted);
        
			/*
	  let sorted = sortedArray(randomPoints);
		
	    this.ctx.beginPath();
       // ctx.clearRect(0, 0, cnv.width, cnv.height);
        //drawPoints(dummyArray);
        sorted.forEach((el:any, i:number)=> {
         if(this.ctx) this.ctx.lineTo(el.x + 2, el.y + 2);
        });
        this.ctx.strokeStyle = "green";
        this.ctx.stroke();
        */ 
  
	 
  }
}
  drawLine(){
	let sorted = sortedArray(this.randomPoints); 
	if(this.ctx){
	this.ctx.beginPath(); 
	sorted.forEach((el:any, i:number)=> {
         if(this.ctx) this.ctx.lineTo(el.x + 2, el.y + 2);
        });
        this.ctx.strokeStyle = "green";
        this.ctx.stroke();
}
  }
  
  showDynamicComponent(): void{
	  //this.viewRef.clear();
	  this.componentRef= this.viewRef.createComponent(DynamicComponent);
  }
  
  }
  function sortedArray(arr:any) :any{
        arr.sort(function (a:any, b:any) {
          return a.x - b.x;
        });
        return arr;
      }
