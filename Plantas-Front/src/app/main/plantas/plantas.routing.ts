import { InfoComponent } from "./info/info.component";

export const plantaRouting = [
  { path: 'new', component: InfoComponent },
  { path: 'planta/:mode/:id', component: InfoComponent },
];
