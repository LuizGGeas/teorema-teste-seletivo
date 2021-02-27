import { AleloService } from './../../../services/alelo.service';
import { ErrorDialogComponent } from './../../../shared/components/error-dialog/error-dialog.component';
import { SuccessDialogComponent } from './../../../shared/components/success-dialog/success-dialog.component';
import { AdicionarAleloDialogComponent } from './component/adicionar-alelo-dialog/adicionar-alelo-dialog.component';
import { Alelo } from './../../../shared/models/alelo';
import { Caracteristica } from './../../../shared/models/caracteristica';
import { CaracteristicaService } from './../../../services/caracteristica.service';
import {
  FormGroup,
  FormArray,
  AbstractControl,
  FormControl,
} from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { CaracteristicaFormUtils } from './form-utils';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { touchForm } from 'src/app/shared/utils/touch-form-utils';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss'],
})
export class InfoComponent extends CaracteristicaFormUtils implements OnInit {
  caracteristica: Caracteristica;

  alelo: Alelo;

  aleloList: Alelo[] = [];

  acao;

  get alelos(): FormArray {
    return this.caracteristicaForm.get('alelos') as FormArray;
  }

  constructor(
    private apiService: CaracteristicaService,
    private aleloService: AleloService,
    private routerSnapshot: ActivatedRoute,
    private dialog: MatDialog
  ) {
    super();
  }

  ngOnInit(): void {
    this.initializeForm();
    this.aleloService.getAlelos().subscribe((data) => {
      this.aleloList = data;
    });
    this.routerSnapshot.params.subscribe(async (data) => {
      const { id, mode } = data;
      this.acao = mode;
      if (id) {
        this.caracteristica = await this.apiService
          .getCaracteristica(id)
          .toPromise();
        this.convertPlantaCaracteristicaToForm(this.caracteristica, mode);
      }

      if (!this.alelos.length || mode === 'new') {
        this.addGenotipoToForm();
        this.addGenotipoToForm();
      }
    });
  }

  addGenotipoToForm(): void {
    this.alelos.push(
      new FormGroup({
        id: new FormControl(null),
        caracteristica: new FormControl({
          value: null,
          disabled: this.acao === 'info',
        }),
        tpAlelo: new FormControl({
          value: 'A',
          disabled: this.acao === 'info',
        }),
      })
    );
  }

  getFormGroup(form: AbstractControl): FormGroup {
    return form as FormGroup;
  }

  getFormGroupAt(index) {
    return this.alelos.at(index) as FormGroup;
  }

  attributeDisplay(attribute1, attribute2) {
    if (!attribute2 || attribute1.id === attribute2.id) {
      return attribute1.caracteristica;
    } else {
      return '';
    }
  }

  adicionarAleloToList(index) {
    const dialog = this.dialog.open(AdicionarAleloDialogComponent);
    dialog.afterClosed().subscribe((data) => {
      if (data) {
        console.log(data);
        this.getFormGroupAt(index).patchValue(data);
        this.getFormGroupAt(index).get('caracteristica').setValue(data);
        this.aleloList.push(data);
      }
    });
  }

  saveCaracteristica() {
    touchForm(this.caracteristicaForm);
    if (this.caracteristicaForm.valid) {
      const data: Caracteristica = this.caracteristicaForm.getRawValue();
      data.alelos.forEach((alelo) => {
        if (typeof alelo.caracteristica !== 'string'){
          alelo.caracteristica = (alelo.caracteristica as any).caracteristica;
        }
      });
      this.apiService.saveCaracteristica(data).subscribe(
        () => this.dialog.open(SuccessDialogComponent),
        () => this.dialog.open(ErrorDialogComponent)
      );
    }
  }

  async deleteCaracteristica() {
    try {
      await this.apiService.deleteCaracteristica(this.caracteristica.id).toPromise();
      this.caracteristicaForm.reset();
      this.dialog.open(SuccessDialogComponent);
    }catch(error) {
      console.error(error);
      this.dialog.open(ErrorDialogComponent);
    }
  }
}
