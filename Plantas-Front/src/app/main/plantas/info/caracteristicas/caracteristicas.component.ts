import { Alelo } from '../../../../shared/models/alelo';
import { CaracteristicaService } from 'src/app/services/caracteristica.service';
import {
  FormGroup,
  FormArray,
  FormControl,
  AbstractControl,
} from '@angular/forms';
import { Component, Input, OnInit } from '@angular/core';
import { Caracteristica } from '../../../../shared/models/caracteristica';

@Component({
  selector: 'app-caracteristicas',
  templateUrl: './caracteristicas.component.html',
  styleUrls: ['./caracteristicas.component.scss'],
})
export class CaracteristicasComponent implements OnInit {
  @Input() form: FormGroup;

  @Input() acao = '';

  caracteristica: Caracteristica;

  caracteristicaList: Promise<Caracteristica[]>;

  aleloList: Alelo[] = [];

  get alelos(): FormArray {
    return this.form.get('alelos') as FormArray;
  }

  constructor(private apiService: CaracteristicaService) {}

  ngOnInit(): void {
    this.caracteristica = this.form.getRawValue();
    this.aleloList = this.caracteristica.alelos;

    this.caracteristicaList = this.getCaracteristicasList();

    this.form.get('nome').valueChanges.subscribe(() => {
      this.caracteristica = this.form.get('nome').value;
      this.aleloList = this.caracteristica.alelos;
      console.log(this.alelos.value);
      this.alelos.reset([]);
      console.log(this.alelos.value);
      this.aleloList.forEach((alelo) => {
        if(alelo.caracteristica) {
          this.addAleloToForm(alelo);
        }
      });

    });
  }

  addAleloToForm(data): void {
    const genotipoForm = this.getNewFormAlelo(data);
    this.alelos.push(genotipoForm);
  }

  getNewFormAlelo(data) {
    return new FormGroup({
      idAlelo: new FormControl(data.idAlelo),
      caracteristica: new FormControl({
        value: data.caracteristica,
        disabled: this.acao === 'info',
      }),
      tpAlelo: new FormControl({
        value: data.tpAlelo,
        disabled: this.acao === 'info',
      }),
    });
  }

  async getCaracteristicasList(): Promise<Caracteristica[]> {
    return await this.apiService.getCaracteristicaList().toPromise();
  }

  attributeDisplay(attribute1, attribute2) {
    if (attribute1.id == attribute2.id) {
      return attribute1.nome;
    } else {
      return '';
    }
  }

  setGenotipoOnIndex($event, index) {
    console.log(this.alelos.value);
    const genotipoForm = this.form.get('genotipos') as FormArray;
    if(genotipoForm.length > index) {
      genotipoForm.at(index).setValue(this.getNewFormAlelo($event.value));
    } else {
      genotipoForm.push(this.getNewFormAlelo($event.value));
    }
    console.log(this.alelos.value);
  }
}
