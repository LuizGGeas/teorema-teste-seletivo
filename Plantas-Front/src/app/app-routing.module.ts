import { InfoComponent } from './main/plantas/info/info.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CruzamentoComponent } from './main/cruzamento/cruzamento.component';
import { MainComponent } from './main/main.component';

const routes: Routes = [
  {
    path: 'plantas',
    component: MainComponent,
    children: [
      { path: 'new', component: InfoComponent },
      { path: 'planta/:mode/:id', component: InfoComponent },
    ],
  },
  { path: 'cruzar', component: CruzamentoComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
