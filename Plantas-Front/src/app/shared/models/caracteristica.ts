import { Alelo } from './alelo';
export class Caracteristica {
  id: number;
  nome: string;
  alelos: Array<Alelo> = [];
  genotipos: Array<Alelo> = [];
}
