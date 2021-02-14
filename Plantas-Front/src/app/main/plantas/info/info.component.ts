import { FormGroup } from '@angular/forms';
import { PlantaService } from './../../../services/planta.service';
import { Component, OnInit } from '@angular/core';
import { Planta } from 'src/app/shared/models/planta';
import { ActivatedRoute } from '@angular/router';
import { PlantaFormUtils } from './form-utils';

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
        this.plantaForm.patchValue(this.planta);
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
      const data = this.plantaForm.getRawValue();

      this.plantaService.savePlanta(data).subscribe(
        () => this.plantaForm.reset(),
        (error) => console.log(error)
      );
    }
  }
}
