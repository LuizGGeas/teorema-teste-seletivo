import { SuccessDialogComponent } from './../../../shared/components/success-dialog/success-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { FormGroup } from '@angular/forms';
import { PlantaService } from './../../../services/planta.service';
import { Component, OnInit } from '@angular/core';
import { Planta } from 'src/app/shared/models/planta';
import { ActivatedRoute } from '@angular/router';
import { PlantaFormUtils } from './form-utils';
import { ErrorDialogComponent } from 'src/app/shared/components/error-dialog/error-dialog.component';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss'],
})
export class InfoComponent extends PlantaFormUtils implements OnInit {
  planta: Planta;

  isPlantaInfoOpened = false;

  isPlantaCaracteristicasOpened = false;

  constructor(
    private plantaService: PlantaService,
    private routeSnapshot: ActivatedRoute,
    private dialog: MatDialog
  ) {
    super();
  }

  ngOnInit() {
    this.initalizeForm();
    this.routeSnapshot.params.subscribe(async (data) => {
      const { id, mode } = data;
      this.acao = mode ? mode : 'new';
      if (id) {
        this.planta = await this.plantaService.getPlanta(id).toPromise();
        this.plantaForm.patchValue(this.planta);
        const caracteristicasForm: FormGroup[] = this.planta.caracteristicas.map(
          (caracteristica) =>
            this.convertPlantaCaracteristicaToForm(caracteristica, mode)
        );
        this.caracteristicas.clear();
        caracteristicasForm.forEach((element) => {
          this.caracteristicas.push(element);
        });
      } else {
        this.addCaracteristicaToForm();
      }
    });
  }

  addCaracteristicaToForm(): void {
    const form = this.convertPlantaCaracteristicaToForm(null, this.acao);
    this.caracteristicas.push(form);
  }

  getFormGroup(index: number): FormGroup {
    return this.caracteristicas.at(index) as FormGroup;
  }

  salvarPlanta(): void {
    if (this.validateForm()) {
      const data: Planta = this.plantaForm.getRawValue();
      console.log(data);
      data.caracteristicas.forEach((caracteristica) => {
        if (typeof caracteristica.nome !== 'string') {
          caracteristica.nome = (caracteristica.nome as any).nome;
        }

        caracteristica.alelos = caracteristica.alelos.filter(
          (alelo) => alelo.caracteristica
        );
        caracteristica.genotipos = caracteristica.genotipos.filter(
          (genotipo) => genotipo.caracteristica
        );
      });
      this.plantaService.savePlanta(data).subscribe(
        () => {
          this.plantaForm.reset();
          this.dialog.open(SuccessDialogComponent);
        },
        (error) => this.dialog.open(ErrorDialogComponent)
      );
    }
  }

  deletarPlanta() {
    try {
      this.plantaService.deletePlanta(this.planta.idPlanta).toPromise();
    } catch (error) {
      this.dialog.open(ErrorDialogComponent);
    }
  }
}
