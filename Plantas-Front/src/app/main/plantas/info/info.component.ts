import { Alelo } from './../../../shared/models/alelo';
import { Caracteristica } from './../../../shared/models/caracteristica';
import { PlantaService } from './../../../services/planta.service';
import { PlantaSelecionadaService } from './../../../services/planta-selecionada.service';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Planta } from 'src/app/shared/models/planta';
import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss'],
})
export class InfoComponent implements OnInit {
  planta: Planta;
  acao = '';

  form: FormGroup;

  isPlantaInfoOpened = false;

  isPlantaCaracteristicasOpened = false;

  get caracteristicas(): FormArray {
    return this.form.get('caracteristicas') as FormArray;
  }

  constructor(
    private plantaSelecionada: PlantaSelecionadaService,
    private plantaService: PlantaService,
    private routeSnapshot: ActivatedRoute
  ) {}

  ngOnInit() {
    this.initalizeForm();
    this.routeSnapshot.params.subscribe(async (data) => {
      const { id, mode } = data;

      if (id) {
        this.planta = await this.plantaService.getPlanta(id).toPromise();
        this.form.patchValue(this.planta);
        const caracteristicasForm: FormGroup[] = this.planta.caracteristicas.map(
          (caracteristica) =>
            this.convertPlantaCaracteristicaToForm(caracteristica, mode)
        );
        this.caracteristicas.clear();
        caracteristicasForm.forEach((element) => {
          this.caracteristicas.push(element);
        });
      }
    });
  }

  initalizeForm(): void {
    this.form = new FormGroup({
      idPlanta: new FormControl(null),
      nmPlanta: new FormControl(
        { value: null, disabled: this.acao === 'info' },
        Validators.required
      ),
      filoPlanta: new FormControl(
        { value: null, disabled: this.acao === 'info' },
        Validators.required
      ),
      classePlanta: new FormControl(
        { value: null, disabled: this.acao === 'info' },
        Validators.required
      ),
      ordemPlanta: new FormControl(
        { value: null, disabled: this.acao === 'info' },
        Validators.required
      ),
      familiaPlanta: new FormControl(
        { value: null, disabled: this.acao === 'info' },
        Validators.required
      ),
      caracteristicas: new FormArray([]),
    });
  }

  convertPlantaCaracteristicaToForm(
    caracteristica: Caracteristica,
    acao: string
  ): FormGroup {
    if (caracteristica) {
      const caracteristicaForm = new FormGroup({
        id: new FormControl(caracteristica.id),
        nome: new FormControl({
          value: caracteristica.nome,
          disabled: acao === 'info',
        }),
        alelos: new FormArray([]),
        genotipos: new FormArray([]),
      });

      const alelosForm: FormGroup[] = caracteristica.alelos.map(
        (alelo: Alelo) => {
          return new FormGroup({
            idAlelo: new FormControl({
              value: alelo.idAlelo,
              disabled: acao !== 'info',
            }),
            caracteristica: new FormControl({
              value: alelo.caracteristica,
              disabled: acao !== 'info',
            }),
            tpAlelo: new FormControl({
              value: alelo.tpAlelo,
              disabled: acao !== 'info',
            }),
          });
        }
      );
      const genotipoForm: FormGroup[] = caracteristica.genotipos.map(
        (genotipo: Alelo) => {
          return new FormGroup({
            idAlelo: new FormControl({
              value: genotipo.idAlelo,
              disabled: acao === 'info',
            }),
            caracteristica: new FormControl({
              value: genotipo.caracteristica,
              disabled: acao === 'info',
            }),
            tpAlelo: new FormControl({
              value: genotipo.tpAlelo,
              disabled: acao === 'info',
            }),
          });
        }
      );
      if (alelosForm) {
        alelosForm.forEach((form) => {
          ((caracteristicaForm.get('caracteristica') as FormGroup).get(
            'alelos'
          ) as FormArray).push(form);
        });
      }

      if (genotipoForm) {
        genotipoForm.forEach((form) => {
          (caracteristicaForm.get('genotipo') as FormArray).push(form);
        });
      }
      return caracteristicaForm;
    }

    return null;
  }

  addCaracteristicaToForm(): void {
    this.caracteristicas.push(
      this.convertPlantaCaracteristicaToForm(null, 'new')
    );
  }

  getFormGroup(index: number): FormGroup {
    return this.caracteristicas.at(index) as FormGroup;
  }

  salvarPlanta(): void {
    if (this.validateForm()) {
      const data = this.form.getRawValue();
      data.caracteristicas.forEach((caracteristica) => {
        caracteristica = {
          ...caracteristica,
          alelos: caracteristica.genotipo,
        };
      });

      this.plantaService.savePlanta(data).subscribe(
        () => {
          this.form.reset();
          this.plantaSelecionada.plantaSelecionada.emit(null);
        },
        (error) => console.log(error)
      );
    }
  }

  validateForm(): boolean {
    this.touchForm(this.form);
    this.caracteristicas.controls.forEach((control) =>
      this.touchForm(control as FormGroup)
    );
    return this.form.valid;
  }

  touchForm(form: FormGroup): void {
    Object.keys(form.controls).forEach((key) => {
      form.controls[key].markAsTouched();
      form.controls[key].updateValueAndValidity();
    });
  }
}
