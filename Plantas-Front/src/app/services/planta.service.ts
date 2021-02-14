import { Planta } from 'src/app/shared/models/planta';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import * as plantas from '../../assets/plantas.json';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PlantaService {
  endPoint = 'http://localhost:8080/planta';

  constructor(private http: HttpClient) {}

  getPlantasList(): Observable<Planta[]> {
    return this.http.get<Planta[]>(this.endPoint);
  }

  getPlanta(index: any): Observable<Planta> {
    return this.http.get<Planta>(`${this.endPoint}/${index}`);
  }

  savePlanta(planta: Planta): Observable<Planta> {
    if(planta.idPlanta) {
      return this.http.put<Planta>(this.endPoint, planta);
    }
    return this.http.post<Planta>(this.endPoint, planta);
  }

}
