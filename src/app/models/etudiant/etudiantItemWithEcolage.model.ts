import { EtudiantList } from './etudiantList.model';

export interface EtudiantItemWithEcolage extends EtudiantList {
  jour: number;
  mois: number;
  annee: number;
  payed: boolean;
}
