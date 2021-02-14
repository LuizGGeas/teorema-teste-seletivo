import { FormGroup } from '@angular/forms';
export function touchForm(form: FormGroup): void {
  Object.keys(form.controls).forEach((key) => {
    form.controls[key].markAsTouched();
    form.controls[key].updateValueAndValidity();
  });
}
