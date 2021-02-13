import { PlantaService } from './../../services/planta.service';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from './../../shared/shared.module';
import { AppRoutingModule } from './../../app-routing.module';
import { PlantasComponent } from './plantas.component';
import { InfoComponent } from './info/info.component';
import { ItensComponent } from './itens/itens.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CaracteristicasComponent } from './info/caracteristicas/caracteristicas.component';



@NgModule({
  declarations: [
    PlantasComponent,
    InfoComponent,
    ItensComponent,
    CaracteristicasComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    ReactiveFormsModule,
    SharedModule
  ],
  providers: [PlantaService],
})
export class PlantasModule { }