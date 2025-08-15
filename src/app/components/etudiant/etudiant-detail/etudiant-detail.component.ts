import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { EtudiantDetail } from '../../../models/etudiant/etudiantDetail.model';
import { EtudiantService } from '../../../services/etudiants/etudiant.service';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AsyncPipe } from '@angular/common';
import { InputMBJComponent } from '../../communs/input-mbj/input-mbj.component';
import { environment } from '../../../../environments/environment.development';
import { EtudiantUpdate } from '../../../models/etudiant/etudiantUpdate.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-etudiant-detail',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, AsyncPipe, InputMBJComponent],
  templateUrl: './etudiant-detail.component.html',
  styleUrl: './etudiant-detail.component.scss',
})
export class EtudiantDetailComponent implements OnInit {
  idEtudiant!: number;
  etudiantDetail$!: Observable<EtudiantDetail>;

  numeroRegexp: RegExp = environment.numeroRegexp;

  etats = [
    { value: 'I', label: 'Inscrit(e)' },
    { value: 'A', label: 'Ancien(ne)' },
  ];

  mainForm!: FormGroup;
  matriculEtutiantFormControl = new FormControl('');
  etatEtudiantFormControl = new FormControl('');
  nomEtudiantFormControl = new FormControl('');
  prenomEtudiantFormControl = new FormControl('');
  dateNaissanceFormControl = new FormControl('');
  nombreFraterniteFormControl = new FormControl('');
  adresseFormControl = new FormControl('', Validators.required);
  adresseErreur!: string;

  nomMereFormControl = new FormControl('');
  telephoneMereFormControl = new FormControl('');
  telephoneMereErreur!: string;
  professionMereFormControl = new FormControl('');

  nomPereFormControl = new FormControl('');
  telephonePereFormControl = new FormControl('');
  telephonePereErreur!: string;
  professionPereFormControl = new FormControl('');

  nomTuteurFormControl = new FormControl('');
  telephoneTuteurFormControl = new FormControl('');
  telephoneTuteurErreur!: string;
  professionTuteurFormControl = new FormControl('');

  noteSupplementaireFormControl = new FormControl('');
  constructor(
    private activatedRoute: ActivatedRoute,
    private etudiantService: EtudiantService,
    private toastr: ToastrService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.idEtudiant = this.activatedRoute.snapshot.params['id'];
    this.etudiantDetail$ = this.etudiantService
      .getEtudiantDetailById(this.idEtudiant)
      .pipe(
        tap((etudiantDetail) => {
          this.setDisableImput(
            this.matriculEtutiantFormControl,
            etudiantDetail.matricule
          );

          this.etatEtudiantFormControl.setValue(etudiantDetail.etat);
          this.setDisableImput(this.nomEtudiantFormControl, etudiantDetail.nom);
          this.setDisableImput(
            this.prenomEtudiantFormControl,
            etudiantDetail.prenom
          );
          this.setDisableImput(
            this.dateNaissanceFormControl,
            etudiantDetail.dateNaissance
          );
          this.nombreFraterniteFormControl.setValue(
            etudiantDetail.nombreFraternite + ''
          );
          this.adresseFormControl.setValue(etudiantDetail.adresse);

          this.setFormulaireMere(etudiantDetail);
          this.setFormulairePere(etudiantDetail);
          this.setFormulaireTuteur(etudiantDetail);

          if (etudiantDetail.noteSupplementaire != null) {
            this.noteSupplementaireFormControl.setValue(
              etudiantDetail.noteSupplementaire
            );
          }
        })
      );

    this.mainForm = new FormGroup({
      matriculEtudiant: this.matriculEtutiantFormControl,
      nomEtudiant: this.nomEtudiantFormControl,
      prenomEtudiant: this.prenomEtudiantFormControl,
      dateDeNaissanceEtudiant: this.dateNaissanceFormControl,
      nombreFraternite: this.nombreFraterniteFormControl,
      adresseEtudiant: this.adresseFormControl,
      nomMere: this.nomMereFormControl,
      telephoneMere: this.telephoneMereFormControl,
      professionMere: this.professionMereFormControl,
      nomPere: this.nomPereFormControl,
      telephonePere: this.telephonePereFormControl,
      professionPere: this.professionPereFormControl,
      nomTuteur: this.nomTuteurFormControl,
      telephoneTuteur: this.telephoneTuteurFormControl,
      professionTuteur: this.professionTuteurFormControl,
      noteSupplementaire: this.noteSupplementaireFormControl,
      etatEtudiant: this.etatEtudiantFormControl,
    });
  }

  setDisableImput(inputFormControl: FormControl, value: string) {
    inputFormControl.setValue(value);
    inputFormControl.disable();
  }

  onSubmit() {
    this.setErreurAdresse();
    this.setErreurTelephoneMere();
    this.setErreurTelephonePere();
    this.setErreurTelephoneTuteur();

    if (this.mainForm.valid) {
      let mainValue = this.mainForm.value;
      let etudiantUpdate: EtudiantUpdate = {
        id: this.idEtudiant,
        etat: mainValue.etatEtudiant,
        nombreFraternite: Number(mainValue.nombreFraternite),
        telephoneMere: mainValue.telephoneMere,
        professionMere: mainValue.professionMere,
        telephonePere: mainValue.telephonePere,
        professionPere: mainValue.professionPere,
        telephoneTuteur: mainValue.telephoneTuteur,
        professionTuteur: mainValue.professionTuteur,
        adresse: mainValue.adresseEtudiant,
        noteSupplementaire: mainValue.noteSupplementaire,
      };
      this.etudiantService
        .updateEtudiant(etudiantUpdate)
        .subscribe((reponse) => {
          if (!reponse.isError) {
            this.toastr.success('Etudiant(e) modifié(e)', 'Information');
          } else {
            this.toastr.success(reponse.message, 'Information');
          }
        });
    }
  }

  setFormulaireMere(etudiantDetail: EtudiantDetail) {
    if (etudiantDetail.nomMere != null && etudiantDetail.nomMere !== '') {
      this.nomMereFormControl.setValue(etudiantDetail.nomMere);
      this.nomMereFormControl.disable();
      this.telephoneMereFormControl.setValue(
        etudiantDetail.telephoneMere != null ? etudiantDetail.telephoneMere : ''
      );
      this.telephoneMereFormControl.addValidators([
        Validators.required,
        Validators.pattern(this.numeroRegexp),
      ]);
      this.professionMereFormControl.setValue(
        etudiantDetail.professionMere != null
          ? etudiantDetail.professionMere
          : ''
      );
    }
  }
  setFormulairePere(etudiantDetail: EtudiantDetail) {
    if (etudiantDetail.nomPere != null && etudiantDetail.nomPere !== '') {
      this.nomPereFormControl.setValue(etudiantDetail.nomPere);
      this.nomPereFormControl.disable();
      this.telephonePereFormControl.setValue(
        etudiantDetail.telephonePere != null ? etudiantDetail.telephonePere : ''
      );
      this.telephonePereFormControl.addValidators([
        Validators.required,
        Validators.pattern(this.numeroRegexp),
      ]);
      this.professionPereFormControl.setValue(
        etudiantDetail.professionPere != null
          ? etudiantDetail.professionPere
          : ''
      );
    }
  }
  setFormulaireTuteur(etudiantDetail: EtudiantDetail) {
    if (etudiantDetail.nomTuteur != null && etudiantDetail.nomTuteur !== '') {
      this.nomTuteurFormControl.setValue(etudiantDetail.nomTuteur);
      this.nomTuteurFormControl.disable();
      this.telephoneTuteurFormControl.setValue(
        etudiantDetail.telephoneTuteur != null
          ? etudiantDetail.telephoneTuteur
          : ''
      );
      this.telephoneTuteurFormControl.addValidators([
        Validators.required,
        Validators.pattern(this.numeroRegexp),
      ]);
      this.professionTuteurFormControl.setValue(
        etudiantDetail.professionTuteur != null
          ? etudiantDetail.professionTuteur
          : ''
      );
    }
  }

  setErreurAdresse() {
    if (this.mainForm.get('adresseEtudiant')?.hasError('required')) {
      this.adresseErreur = 'Le champs adresse est obligatoire.';
    } else {
      this.adresseErreur = '';
    }
  }
  setErreurTelephoneMere() {
    if (this.mainForm.get('telephoneMere')?.hasError('required')) {
      this.telephoneMereErreur = 'Champs télephone mére obligatoire';
    } else if (this.mainForm.get('telephoneMere')?.hasError('pattern')) {
      this.telephoneMereErreur =
        "Le format du numero n'est pas correct. Ex: 0330000000";
    } else {
      this.telephoneMereErreur = '';
    }
  }

  setErreurTelephonePere() {
    if (this.mainForm.get('telephonePere')?.hasError('required')) {
      this.telephonePereErreur = 'Champs télephone pére obligatoire';
    } else if (this.mainForm.get('telephonePere')?.hasError('pattern')) {
      this.telephonePereErreur =
        "Le format du numero n'est pas correct. Ex: 0330000000";
    } else {
      this.telephonePereErreur = '';
    }
  }

  setErreurTelephoneTuteur() {
    if (this.mainForm.get('telephoneTuteur')?.hasError('required')) {
      this.telephoneTuteurErreur = 'Champs télephone tuteur obligatoire';
    } else if (this.mainForm.get('telephoneTuteur')?.hasError('pattern')) {
      this.telephoneTuteurErreur =
        "Le format du numero n'est pas correct. Ex: 0330000000";
    } else {
      this.telephoneTuteurErreur = '';
    }
  }

  onAnnuler() {
    console.log('onAnnuler');
    this.router.navigateByUrl('principal/etudiantList');
  }
}
