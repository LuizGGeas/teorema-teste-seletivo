import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CruzamentoComponent } from './main/cruzamento/cruzamento.component';
import { MainComponent } from './main/main.component';

const routes: Routes = [
  {
    path: 'plantas',
    component: MainComponent,
  },
  { path: 'cruzar', component: CruzamentoComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
