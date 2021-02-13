import { plantaRouting } from './main/plantas/plantas.routing';
import { PlantasComponent } from './main/plantas/plantas.component';
import { CaracteristicaComponent } from './main/caracteristica/caracteristica.component';
import { InfoComponent } from './main/plantas/info/info.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CruzamentoComponent } from './main/cruzamento/cruzamento.component';
import { caracteristicaRouting } from './main/caracteristica/caracteristica.routing';

const routes: Routes = [
  {
    path: 'plantas',
    component: PlantasComponent,
    children: plantaRouting,
  },
  {
    path: 'caracteristica',
    component: CaracteristicaComponent,
    children: caracteristicaRouting,
  },
  { path: 'cruzar', component: CruzamentoComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
