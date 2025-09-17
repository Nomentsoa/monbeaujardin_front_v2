import { PagedListParent } from '../pagedListParent.model';
import { EtudiantItemWithEcolage } from './etudiantItemWithEcolage.model';

export interface PagedEtudiantWithEcolageList extends PagedListParent {
  etudiantEcolages: Array<EtudiantItemWithEcolage>;
}
