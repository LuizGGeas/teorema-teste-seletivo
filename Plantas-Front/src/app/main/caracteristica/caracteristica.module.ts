import { AleloService } from './../../services/alelo.service';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { CaracteristicaComponent } from './caracteristica.component';
import { AppRoutingModule } from './../../app-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InfoComponent } from './info/info.component';
import { ItensComponent } from './itens/itens.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { CaracteristicaService } from 'src/app/services/caracteristica.service';
import { AdicionarAleloDialogComponent } from './info/component/adicionar-alelo-dialog/adicionar-alelo-dialog.component';

@NgModule({
  declarations: [
    CaracteristicaComponent,
    InfoComponent,
    ItensComponent,
    AdicionarAleloDialogComponent,
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    ReactiveFormsModule,
    SharedModule,
    MatSelectModule,
    MatDialogModule,
  ],
  providers: [CaracteristicaService, AleloService],
  entryComponents: [AdicionarAleloDialogComponent],
})
export class CaracteristicaModule {}
