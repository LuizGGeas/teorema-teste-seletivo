import { CaracteristicaService } from 'src/app/services/caracteristica.service';
import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { InputComponent } from './components/input/input.component';
import { MatSelectModule } from '@angular/material/select';
import { ErrorDialogComponent } from './components/error-dialog/error-dialog.component';
import { SuccessDialogComponent } from './components/success-dialog/success-dialog.component';

@NgModule({
  declarations: [
    InputComponent,
    ErrorDialogComponent,
    SuccessDialogComponent,
    SuccessDialogComponent,
    ErrorDialogComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
  ],
  exports: [InputComponent, SuccessDialogComponent, ErrorDialogComponent],
  providers: [CaracteristicaService],
})
export class SharedModule {}
