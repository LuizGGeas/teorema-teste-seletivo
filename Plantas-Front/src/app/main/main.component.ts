import { Planta } from 'src/app/shared/models/planta';
import { PlantaSelecionadaService } from './../services/planta-selecionada.service';
import { PlantaService } from './../services/planta.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  plantaList: Planta[];

  constructor(
    private plantasService: PlantaService,
    private plantaSelecionada: PlantaSelecionadaService
  ) {}

  ngOnInit(): void {
    this.plantasService.getPlantasList().subscribe((plantas) => {
      this.plantaList = plantas;
    });
  }

  createNewPlanta(): void {
    this.plantaSelecionada.plantaSelecionada.next('new');
  }
}
