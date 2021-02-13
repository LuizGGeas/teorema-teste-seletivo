import { CaracteristicaService } from './../../services/caracteristica.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-caracteristica',
  templateUrl: './caracteristica.component.html',
  styleUrls: ['./caracteristica.component.scss']
})
export class CaracteristicaComponent implements OnInit {
  caracteristicaList;

  constructor(
    private caracteristicaService: CaracteristicaService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.caracteristicaService.getCaracteristicaList().subscribe((caracteristicas) => {
      this.caracteristicaList = caracteristicas;
    });
  }

  createNewCaracteristica(): void {
    this.router.navigate(['/caracteristica/new'])
  }

}
