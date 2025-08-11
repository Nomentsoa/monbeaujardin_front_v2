export interface EtudiantDetail {
  id?: number;
  matricule: string;
  nom: string;
  prenom: string;
  dateNaissance: string;
  adresse: string;
  sexe: string;
  nomMere?: string;
  telephoneMere?: string;
  professionMere?: string;
  nomPere?: string;
  telephonePere?: string;
  professionPere?: string;
  nomTuteur?: string;
  telephoneTuteur?: string;
  professionTuteur?: string;
  noteSupplementaire?: string;
  nombreFraternite?: number;
  image?: string;
  anneeInscription: string;
  etat: string;
}
