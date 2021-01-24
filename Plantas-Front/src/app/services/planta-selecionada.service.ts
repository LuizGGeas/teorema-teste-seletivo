import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PlantaSelecionadaService {

  plantaSelecionada = new EventEmitter();

  constructor() { }
}
