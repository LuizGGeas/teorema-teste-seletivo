import { Alelo } from './../shared/models/alelo';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AleloService {
  endPoint = 'http://localhost:8080/alelos';

  constructor(private http: HttpClient) { }

  getAlelos() {
    return this.http.get<Alelo[]>(this.endPoint);
  }
}
