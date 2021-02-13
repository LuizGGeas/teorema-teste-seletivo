import { PlantaService } from './../../services/planta.service';
import { Component, OnInit } from '@angular/core';
import { Planta } from 'src/app/shared/models/planta';
import { Router } from '@angular/router';

@Component({
  selector: 'app-plantas',
  templateUrl: './plantas.component.html',
  styleUrls: ['./plantas.component.scss'],
})
export class PlantasComponent implements OnInit {
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
