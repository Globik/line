import { HttpService } from './http.service';

import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
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
    let sorted = this.sortedArray(this.randomPoints);
    this.httpService.sendData(sorted).subscribe(
      (data: any) => {
        console.log('data: ', data);

        this.done = true;
        this.drawSpiralX(data.arr, data.m, data.n);
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

  drawSpiral() {
    let sorti = this.sortedArray(this.randomPoints);
    let s: number = 1;
    let n: number = 0;
    let m: number = 0;
    let len = Math.round(Math.sqrt(sorti.length));

    let array: any = [];
    n = len;
    m = len;
    for (let i = 0; i < len; i++) {
      array[i] = [];
      for (let k = 0; k < len; k++) array[i][k] = [0];
    }

    for (let y = 0; y < n; y++) {
      array[0][y] = sorti[y].x;

      s++;
    }
    for (let x = 1; x < m; x++) {
      array[x][n - 1] = sorti[s - 1].x;

      s++;
    }
    for (let y = n - 2; y >= 0; y--) {
      array[m - 1][y] = sorti[s - 1].x;
      s++;
    }
    for (let x = m - 2; x > 0; x--) {
      array[x][0] = sorti[s - 1].x;
      s++;
    }

    for (let x = 0; x < m; x++) {
      for (let y = 0; y < n; y++) {
        if (array[x][y] == 0) {
          array[x][y] = sorti[s - 1].x;
        }
      }
    }

    if (this.ctx) this.ctx.fillStyle = 'brown';
    for (let x = 0; x < m; x++) {
      for (let y = 0; y < n; y++) {
        if (this.ctx) {
          this.ctx.fillRect(50 * x, 50 * y, 45, 45);
          this.ctx.save();
          this.ctx.fillStyle = 'black';

          this.ctx.font = '23px serif';
          this.ctx.fillText(array[y][x], 2 + 55 * x, 23 + 55 * y);
          this.ctx.restore();
        }
      }
    }
  }

  drawSpiralX(arr: any, m: number, n: number) {
    if (this.ctx) this.ctx.fillStyle = 'orange';
    for (let x = 0; x < m; x++) {
      for (let y = 0; y < n; y++) {
        if (this.ctx) {
          this.ctx.fillRect(140 + 50 * x, 150 + 50 * y, 45, 45);
          this.ctx.save();
          this.ctx.fillStyle = 'black';

          this.ctx.font = '23px serif';

          this.ctx.fillText(arr[y][x], 145 + 55 * x, 175 + 55 * y);
          this.ctx.restore();
        }
      }
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
  sortedArray(arr: any) {
    arr.sort(function (a: any, b: any) {
      return a.x - b.x;
    });
    return arr;
  }
}
