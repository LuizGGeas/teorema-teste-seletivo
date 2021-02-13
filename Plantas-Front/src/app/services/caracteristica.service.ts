import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Caracteristica } from '../shared/models/caracteristica';

@Injectable({
  providedIn: 'root'
})
export class CaracteristicaService {
  endPoint = 'http://localhost:8080/caracterisitcas';

  constructor(private http: HttpClient) { }

  getCaracteristicaList(): Observable<Caracteristica[]> {
    return this.http.get<Caracteristica[]>(this.endPoint);
  }

  getCaracteristica(index: any): Observable<Caracteristica> {
    return this.http.get<Caracteristica>(`${this.endPoint}/${index}`);
  }

  saveCaracteristica(planta: Caracteristica): Observable<Caracteristica> {
    return this.http.post<Caracteristica>(this.endPoint, planta);
  }
}