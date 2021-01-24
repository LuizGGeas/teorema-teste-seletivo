import { AbstractControl, FormControl } from '@angular/forms';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})
export class InputComponent implements OnInit {

  @Input() label = '';

  @Input('form') _form: AbstractControl;

  get form(): FormControl {
    return this._form as FormControl;
  }

  constructor() { }

  ngOnInit(): void {
  }

}
