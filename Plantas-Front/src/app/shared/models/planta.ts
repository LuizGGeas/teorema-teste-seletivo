import { Caracteristica } from './caracteristica';
export class Planta {
  idPlanta: number;
  nmPlanta: string;
  nmFilo: string;
  nmClasse: string;
  nmOrdem: string;
  nmFamilia: string;
  caracteristicas: Array<Caracteristica>;
}
