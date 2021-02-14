import { CaracteristicaService } from 'src/app/services/caracteristica.service';
import { FormGroup, FormArray, FormControl, AbstractControl } from '@angular/forms';
import { Component, Input, OnInit } from '@angular/core';
import { Caracteristica } from '../../models/caracteristica';

@Component({
  selector: 'app-caracteristicas',
  templateUrl: './caracteristicas.component.html',
  styleUrls: ['./caracteristicas.component.scss'],
})
export class CaracteristicasComponent implements OnInit {
  @Input() form: FormGroup;

  @Input() acao = '';

  @Input() origem = 'planta';

  caracteristica: Caracteristica;

  caracteristicaList: Promise<Caracteristica[]>;

  get genotipos(): FormArray {
    return this.form.get('genotipos') as FormArray;
  }

  constructor(private apiService: CaracteristicaService) {}

  ngOnInit(): void {
    if (!this.genotipos.length || this.acao === 'new') {
      this.addGenotipoToForm();
      this.addGenotipoToForm();
    }

    this.caracteristicaList = this.getCaracteristicasList();

    if(this.origem === 'planta') {
      this.form.get('nome').valueChanges.subscribe(data => {
        this.caracteristica = data;
      })
    }
  }

  addGenotipoToForm(): void {
    this.genotipos.push(
      new FormGroup({
        id: new FormControl(null),
        nome: new FormControl({value: null, disabled: this.acao === 'info'}),
        valor: new FormControl({value: 'A', disabled: this.acao === 'info'}),
      })
    );
  }

  async getCaracteristicasList(): Promise<Caracteristica[]> {
    return await this.apiService.getCaracteristicaList().toPromise();
  }

  getFormGroup(form: AbstractControl): FormGroup {
    return form as FormGroup;
  }
}
