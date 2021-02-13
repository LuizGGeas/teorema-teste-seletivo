import { Caracteristica } from './../../../shared/models/caracteristica';
import { Alelo } from './../../../shared/models/alelo';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
export class FormUtils {
  acao = '';

  form: FormGroup;

  get caracteristicas(): FormArray {
    return this.form.get('caracteristicas') as FormArray;
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

    return new FormGroup({
      id: new FormControl(null),
      nome: new FormControl(null),
      alelos: new FormArray([]),
      genotipos: new FormArray([]),
    });
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
