import { FormGroup, FormArray, FormControl, AbstractControl } from '@angular/forms';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-caracteristicas',
  templateUrl: './caracteristicas.component.html',
  styleUrls: ['./caracteristicas.component.scss'],
})
export class CaracteristicasComponent implements OnInit {
  @Input() form: FormGroup;

  @Input() acao = '';

  get genotipos(): FormArray {
    return this.form.get('genotipos') as FormArray;
  }

  constructor() {}

  ngOnInit(): void {
    if (!this.genotipos.length && this.acao === 'new') {
      this.addGenotipoToForm();
      this.addGenotipoToForm();
    }
  }

  addGenotipoToForm(): void {
    this.genotipos.push(
      new FormGroup({
        id: new FormControl(null),
        nome: new FormControl({value: null, disabled: this.acao === 'info'}),
        valor: new FormControl({value: 'A', disabled: this.acao === 'info'}),
      })
    );
  }

  getFormGroup(form: AbstractControl): FormGroup {
    return form as FormGroup;
  }

  getControlAt(index): FormGroup {
    return this.genotipos.at(index) as FormGroup;
  }
}
