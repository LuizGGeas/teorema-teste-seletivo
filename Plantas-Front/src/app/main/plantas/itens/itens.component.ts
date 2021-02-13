import { Planta } from './../../../shared/models/planta';
import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-itens',
  templateUrl: './itens.component.html',
  styleUrls: ['./itens.component.scss']
})
export class ItensComponent implements OnInit {

  @Input() planta: Planta;

  clicked = false;

  constructor(private rotuer: Router) {}

  ngOnInit(): void {}

  openForEdit(): void {
    this.rotuer.navigate(['/plantas/planta', 'edit', this.planta.idPlanta]);
  }

  openForInfo(): void {
    this.rotuer.navigate(['/plantas/planta', 'info', this.planta.idPlanta]);
  }

}
