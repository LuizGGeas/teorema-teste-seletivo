import { ReactiveFormsModule } from '@angular/forms';
import { CaracteristicaComponent } from './caracteristica.component';
import { AppRoutingModule } from './../../app-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InfoComponent } from './info/info.component';
import { ItensComponent } from './itens/itens.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { CaracteristicaService } from 'src/app/services/caracteristica.service';

@NgModule({
  declarations: [CaracteristicaComponent, InfoComponent, ItensComponent],
  imports: [CommonModule, AppRoutingModule, ReactiveFormsModule, SharedModule],
})
export class CaracteristicaModule {}
