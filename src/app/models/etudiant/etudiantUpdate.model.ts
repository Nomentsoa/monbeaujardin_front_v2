export interface EtudiantUpdate {
  id: number;
  etat: string;
  nombreFraternite: number;
  telephoneMere?: string;
  professionMere?: string;
  telephonePere?: string;
  professionPere?: string;
  telephoneTuteur?: string;
  professionTuteur?: string;
  adresse: string;
  noteSupplementaire?: string;
}
