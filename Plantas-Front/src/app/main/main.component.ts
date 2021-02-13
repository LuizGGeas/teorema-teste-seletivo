import { Planta } from 'src/app/shared/models/planta';
import { PlantaSelecionadaService } from './../services/planta-selecionada.service';
import { PlantaService } from './../services/planta.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  plantaList: Planta[];

  constructor(
    private plantasService: PlantaService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.plantasService.getPlantasList().subscribe((plantas) => {
      this.plantaList = plantas;
    });
  }

  createNewPlanta(): void {
    this.router.navigate(['/plantas/new'])
  }
}
