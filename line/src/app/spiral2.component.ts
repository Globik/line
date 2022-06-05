
import { HttpService } from './http.service';

import {
  Component,
  //ViewContainerRef,
  ViewChild,
  ElementRef,
  AfterViewInit,
  //ComponentRef,
} from '@angular/core';
import { NgModel } from '@angular/forms';

@Component({
  selector: 'spiral2-app',
  templateUrl: './spiral2.component.html',
  providers: [HttpService],
})
export class Spiral2Component implements AfterViewInit {
	x: string = '';
  y: string = '';

  @ViewChild('canvasEl4', { static: false })
  canvas: ElementRef<HTMLCanvasElement>;

  private ctx: CanvasRenderingContext2D | null;
  randomPoints: any = [];
  
  done: boolean = false;
  constructor(private httpService: HttpService) {}
  
  ngAfterViewInit(): void {
    this.ctx = this.canvas.nativeElement.getContext('2d');
    if (this.ctx) {
      for (let i = 0; i < 11; i++) {
        this.randomPoints.push({
          x: Math.floor(Math.random() * 300),
          y: Math.floor(Math.random() * 300),
        });
      }
      this.drawPoints();
    }
  }
  drawPoints() {
    if (this.ctx)
      this.ctx.clearRect(
        0,
        0,
        this.canvas.nativeElement.width,
        this.canvas.nativeElement.height
      );
    this.randomPoints.forEach((el: any, i: number) => {
      if (this.ctx) {
        this.ctx.fillStyle = 'red';
        this.ctx.fillRect(el.x, el.y, 4, 4);
      }
    });
  }
  sendToServer() {
	  
    this.httpService.sendData(this.randomPoints).subscribe(
      (data: any) => {
        console.log('data: ', data);
        
        this.done = true;
        this.drawSpiral(true);
      },
      (error) => console.error(error)
    );
  }
  drawLine(arr: any) {
    if (this.ctx) {
      this.ctx.beginPath();
      arr.forEach((el: any, i: number) => {
        if (this.ctx) this.ctx.lineTo(el.x + 2, el.y + 2);
      });
      this.ctx.strokeStyle = 'red';
      this.ctx.stroke();
    }
  }
  
  drawSpiral(one: boolean) {
    let gap = 7.8;
    let width = this.canvas.nativeElement.width,
      height = this.canvas.nativeElement.height; //размеры канвы
    let cx = Math.floor(width / 2),
      cy = Math.floor(height / 2); //центр канвы
    if (this.ctx) {
      //this.ctx.clearRect(0, 0, width, height);
      this.ctx.moveTo(cx, cy);
      const STEPS_PER_ROTATION = 60; //шагов на круг
      let increment = (2 * Math.PI) / STEPS_PER_ROTATION;
      let theta = increment;
      let ROTATIONS = this.randomPoints.length; //количество вращений
      while (theta < ROTATIONS) {
		  if(!one){
        var newX = cx + theta * Math.cos(theta) * gap;
        var newY = cy - theta * Math.sin(theta) * gap;
	}else{
		var newX = cx - theta * Math.cos(theta) * gap;
        var newY = cy + theta * Math.sin(theta) * gap;
	}
	this.ctx.save();
        this.ctx.lineTo(newX, newY);
        this.ctx.fillStyle = (one ? 'red' : 'green');
        this.ctx.fillRect(newX, newY, 10, 10);
        this.ctx.restore();
        theta += increment * this.randomPoints.length;
      }
      this.ctx.stroke();
    }
  }
  
  addPoint(x: NgModel, y: NgModel) {
    if (!x || !y) {
      alert('No x or y data provided!');
      return;
    }
    this.randomPoints.push({ x: Number(x), y: Number(y) });
    if (this.ctx) {
      this.ctx.fillStyle = 'blue';
      this.ctx.fillRect(Number(x), Number(y), 4, 4);
    }

    this.x = '';
    this.y = '';
  }
}
