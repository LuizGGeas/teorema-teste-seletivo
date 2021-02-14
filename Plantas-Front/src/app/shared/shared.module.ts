import { CaracteristicaService } from 'src/app/services/caracteristica.service';
import { CaracteristicasComponent } from './components/caracteristicas/caracteristicas.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { InputComponent } from './components/input/input.component';
import { MatSelectModule } from '@angular/material/select';

@NgModule({
  declarations: [InputComponent, CaracteristicasComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
  ],
  exports: [InputComponent, CaracteristicasComponent],
  providers: [CaracteristicaService],
})
export class SharedModule {}
