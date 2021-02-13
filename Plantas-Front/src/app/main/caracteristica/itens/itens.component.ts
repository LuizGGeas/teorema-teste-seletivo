import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Caracteristica } from 'src/app/shared/models/caracteristica';

@Component({
  selector: 'app-itens',
  templateUrl: './itens.component.html',
  styleUrls: ['./itens.component.scss']
})
export class ItensComponent implements OnInit {

  @Input() caracteristica: Caracteristica;

  clicked = false;

  constructor(private rotuer: Router) {}

  ngOnInit(): void {}

  openForEdit(): void {
    this.rotuer.navigate(['/caracteristica/caracteristica', 'edit', this.caracteristica.id]);
  }

  openForInfo(): void {
    this.rotuer.navigate(['/caracteristica/caracteristica', 'info', this.caracteristica.id]);
  }

}
