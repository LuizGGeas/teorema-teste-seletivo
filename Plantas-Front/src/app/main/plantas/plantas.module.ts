import { MatSelectModule } from '@angular/material/select';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlantaService } from './../../services/planta.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from './../../shared/shared.module';
import { AppRoutingModule } from './../../app-routing.module';
import { PlantasComponent } from './plantas.component';
import { InfoComponent } from './info/info.component';
import { ItensComponent } from './itens/itens.component';
import { CaracteristicasComponent } from './info/caracteristicas/caracteristicas.component';

@NgModule({
  declarations: [
    PlantasComponent,
    InfoComponent,
    ItensComponent,
    CaracteristicasComponent,
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    ReactiveFormsModule,
    SharedModule,
    MatSelectModule,
    FormsModule
  ],
  providers: [PlantaService],
})
export class PlantasModule {}
