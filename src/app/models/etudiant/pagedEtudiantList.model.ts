import { EtudiantList } from './etudiantList.model';

export interface PagedEtudiantList {
  currentPage: number;
  totalPages: number;
  pageSize: number;
  etudiants: Array<EtudiantList>;
}
