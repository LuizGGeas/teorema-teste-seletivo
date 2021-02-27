import { Planta } from 'src/app/shared/models/planta';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import * as plantas from '../../assets/plantas.json';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PlantaService {
  private endPoint = 'http://localhost:8080/planta';

  constructor(private http: HttpClient) {}

  getPlantasList(): Observable<Planta[]> {
    return this.http.get<Planta[]>(this.endPoint);
  }

  getPlanta(id: any): Observable<Planta> {
    return this.http.get<Planta>(`${this.endPoint}/${id}`);
  }

  savePlanta(planta: Planta): Observable<Planta> {
    if(planta.idPlanta) {
      return this.http.put<Planta>(this.endPoint, planta);
    }
    return this.http.post<Planta>(this.endPoint, planta);
  }

  deletePlanta(id) {
    return this.http.delete(`${this.endPoint}/${id}`)
  }

}
