import { PlantaService } from './services/planta.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';
import { HeaderComponent } from './header/header.component';
import { PlantasComponent } from './main/plantas/plantas.component';
import { InfoComponent } from './main/plantas/info/info.component';
import { CruzamentoComponent } from './main/cruzamento/cruzamento.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { CaracteristicasComponent } from './main/plantas/info/caracteristicas/caracteristicas.component';
import { InputComponent } from './shared/components/input/input.component';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    HeaderComponent,
    PlantasComponent,
    InfoComponent,
    CruzamentoComponent,
    CaracteristicasComponent,
    InputComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [PlantaService],
  bootstrap: [AppComponent]
})
export class AppModule { }
