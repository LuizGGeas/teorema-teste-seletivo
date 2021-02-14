import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { touchForm } from 'src/app/shared/utils/touch-form-utils';
import { CaracteristicaFormUtils } from '../../caracteristica/info/form-utils';
export class PlantaFormUtils extends CaracteristicaFormUtils {
  acao = '';

  plantaForm: FormGroup;

  get caracteristicas(): FormArray {
    return this.plantaForm.get('caracteristicas') as FormArray;
  }

  initalizeForm(): void {
    this.plantaForm = new FormGroup({
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

  validateForm(): boolean {
    touchForm(this.plantaForm);
    this.caracteristicas.controls.forEach((control) =>
      touchForm(control as FormGroup)
    );
    return this.plantaForm.valid;
  }
}
