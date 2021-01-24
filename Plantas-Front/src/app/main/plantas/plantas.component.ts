import { PlantaSelecionadaService } from './../../services/planta-selecionada.service';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Planta } from 'src/app/shared/models/planta';

@Component({
  selector: 'app-plantas',
  templateUrl: './plantas.component.html',
  styleUrls: ['./plantas.component.scss'],
})
export class PlantasComponent implements OnInit {
  @Input() planta: Planta;

  clicked = false;

  constructor(private plantaSelecionada: PlantaSelecionadaService) {}

  ngOnInit(): void {}

  openForEdit(): void {
    const editOpened = `${this.planta.idPlanta}_edit`;
    this.plantaSelecionada.plantaSelecionada.emit(editOpened);
  }

  openForInfo(): void {
    const editOpened = `${this.planta.idPlanta}_info`;
    this.plantaSelecionada.plantaSelecionada.emit(editOpened);
  }
}
