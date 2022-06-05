import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable()
export class HttpService {
  constructor(private http: HttpClient) {}

  postData(points: any) {
    const body = { points: points };
    return this.http.post('http://localhost:3000/api/points', body);
  }
  
  sendData(points: any) {
    const body = { points: points };
    return this.http.post('http://localhost:3000/api/spiral', body);
  }
}
