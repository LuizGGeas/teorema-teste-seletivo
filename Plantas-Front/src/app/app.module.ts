import { PlantasModule } from './main/plantas/plantas.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { CruzamentoComponent } from './main/cruzamento/cruzamento.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CaracteristicaModule } from './main/caracteristica/caracteristica.module';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    CruzamentoComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    CaracteristicaModule,
    PlantasModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
