import { PagedListParent } from '../pagedListParent.model';
import { EtudiantList } from './etudiantList.model';

export interface PagedEtudiantList extends PagedListParent {
  etudiants: Array<EtudiantList>;
}
