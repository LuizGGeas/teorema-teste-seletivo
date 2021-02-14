import { Caracteristica } from './../../../shared/models/caracteristica';
import { Alelo } from './../../../shared/models/alelo';
import { FormGroup, FormArray, FormControl } from '@angular/forms';
export class CaracteristicaFormUtils {
  caracteristicaForm: FormGroup;

  caracteristicaList: Caracteristica[] = [];

  aleloList: Alelo[] = []

  initializeForm() {
    this.caracteristicaForm = new FormGroup({
      id: new FormControl(null),
      nome: new FormControl(null),
      alelos: new FormArray([]),
      genotipos: new FormArray([]),
    });
  }

  convertPlantaCaracteristicaToForm(
    caracteristica: Caracteristica,
    acao: string
  ): FormGroup {
    this.initializeForm();
    if (caracteristica) {
      this.caracteristicaForm.patchValue(caracteristica);
      if(acao === 'info') {
        this.caracteristicaForm.get('nome').disable();
      }

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
          ((this.caracteristicaForm.get('caracteristica') as FormGroup).get(
            'alelos'
          ) as FormArray).push(form);
        });
      }

      if (genotipoForm) {
        genotipoForm.forEach((form) => {
          (this.caracteristicaForm.get('genotipo') as FormArray).push(form);
        });
      }
      return this.caracteristicaForm;
    }

    return new FormGroup({
      id: new FormControl(null),
      nome: new FormControl(null),
      alelos: new FormArray([]),
      genotipos: new FormArray([]),
    });
  }
}
