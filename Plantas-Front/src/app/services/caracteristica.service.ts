import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Caracteristica } from '../shared/models/caracteristica';
import { caracteristicaRouting } from '../main/caracteristica/caracteristica.routing';

@Injectable({
  providedIn: 'root'
})
export class CaracteristicaService {
  endPoint = 'http://localhost:8080/caracteristicas';

  constructor(private http: HttpClient) { }

  getCaracteristicaList(): Observable<Caracteristica[]> {
    return this.http.get<Caracteristica[]>(this.endPoint);
  }

  getCaracteristica(index: any): Observable<Caracteristica> {
    return this.http.get<Caracteristica>(`${this.endPoint}/${index}`);
  }

  saveCaracteristica(caracteristica: Caracteristica): Observable<Caracteristica> {
    if(caracteristica.id) {
      return this.http.put<Caracteristica>(this.endPoint, caracteristica);
    }
    return this.http.post<Caracteristica>(this.endPoint, caracteristica);
  }

  deleteCaracteristica(id) {
    return this.http.delete(`${this.endPoint}/${id}`)
  }
}
