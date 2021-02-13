import { PlantaService } from './../../../services/planta.service';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
import { Planta } from 'src/app/shared/models/planta';
import { ActivatedRoute } from '@angular/router';
import { FormUtils } from './form-utils';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss'],
})
export class InfoComponent extends FormUtils implements OnInit {
  planta: Planta;

  isPlantaInfoOpened = false;

  isPlantaCaracteristicasOpened = false;

  constructor(
    private plantaService: PlantaService,
    private routeSnapshot: ActivatedRoute
  ) {
    super();
  }

  ngOnInit() {
    this.initalizeForm();
    this.routeSnapshot.params.subscribe(async (data) => {
      const { id, mode } = data;
      this.acao = mode;
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

  addCaracteristicaToForm(): void {
    const form = this.convertPlantaCaracteristicaToForm(null, 'new');
    console.log(form);
    this.caracteristicas.push(form);
  }

  getFormGroup(index: number): FormGroup {
    return this.caracteristicas.at(index) as FormGroup;
  }

  salvarPlanta(): void {
    if (this.validateForm()) {
      const data = this.form.getRawValue();

      this.plantaService.savePlanta(data).subscribe(
        () => this.form.reset(),
        (error) => console.log(error)
      );
    }
  }
}
