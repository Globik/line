import {
  Component,
  ViewContainerRef,
  ViewChild,
  ElementRef,
  AfterViewInit,
  ComponentRef,
} from '@angular/core';
import { FormGroup, FormControl, FormArray, NgModel } from '@angular/forms';

@Component({
  selector: 'line1-app',
  templateUrl: './line1.component.html',
})
export class Line1Component implements AfterViewInit {
  x: string = '';
  y: string = '';
  @ViewChild('canvasEl', { static: false })
  canvas: ElementRef<HTMLCanvasElement>;

  private ctx: CanvasRenderingContext2D | null;
  randomPoints: any = [];
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
  drawLine() {
    let sorted = sortedArray(this.randomPoints);
    if (this.ctx) {
      this.ctx.clearRect(
        0,
        0,
        this.canvas.nativeElement.width,
        this.canvas.nativeElement.height
      );
      this.drawPoints();
      this.ctx.beginPath();
      sorted.forEach((el: any, i: number) => {
        if (this.ctx) this.ctx.lineTo(el.x + 2, el.y + 2);
      });
      this.ctx.strokeStyle = 'green';
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
function sortedArray(arr: any): any {
  arr.sort(function (a: any, b: any) {
    return a.x - b.x;
  });
  return arr;
}
