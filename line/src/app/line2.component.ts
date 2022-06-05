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
  selector: 'line2-app',
  templateUrl: './line2.component.html',
  providers: [HttpService],
})

export class Line2Component implements AfterViewInit {
  x: string = '';
  y: string = '';

  @ViewChild('canvasEl3', { static: false })
  canvas: ElementRef<HTMLCanvasElement>;

  private ctx: CanvasRenderingContext2D | null;
  randomPoints: any = [];
  receivedData: any = [];
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
  sendPoints() {
    this.httpService.postData(this.randomPoints).subscribe(
      (data: any) => {
        console.log('data: ', data);
        this.receivedData = data['pointsArr'];
        this.done = true;
        this.drawLine(this.receivedData);
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
