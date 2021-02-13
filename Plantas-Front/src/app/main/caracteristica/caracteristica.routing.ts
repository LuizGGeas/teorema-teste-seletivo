import { InfoComponent } from "./info/info.component";

export const caracteristicaRouting = [
  { path: 'new', component: InfoComponent },
  { path: 'caracteristica/:mode/:id', component: InfoComponent },
];
