import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { touchForm } from 'src/app/shared/utils/touch-form-utils';

@Component({
  selector: 'app-adicionar-alelo-dialog',
  templateUrl: './adicionar-alelo-dialog.component.html',
  styleUrls: ['./adicionar-alelo-dialog.component.scss']
})
export class AdicionarAleloDialogComponent implements OnInit {
  aleloForm: FormGroup;
  constructor(private dialog: MatDialogRef<AdicionarAleloDialogComponent>) { }

  ngOnInit(): void {
    this.aleloForm = new FormGroup({
      id: new FormControl(null),
      caracteristica: new FormControl(null, Validators.required),
      tpAlelo: new FormControl('A')
    });

  }

  adicionarAlelo() {
    touchForm(this.aleloForm);

    if(this.aleloForm.valid) {
      this.dialog.close(this.aleloForm.getRawValue());
    }
  }

  fecharDialog() {
    this.dialog.close();
  }

}
