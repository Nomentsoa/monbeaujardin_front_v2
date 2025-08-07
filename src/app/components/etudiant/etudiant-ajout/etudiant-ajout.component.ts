import { CommonModule } from '@angular/common';
import { Component, model, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { EtudiantDetail } from '../../../models/etudiant/etudiantDetail.model';
import { EtudiantService } from '../../../services/etudiants/etudiant.service';
import { MatriculService } from '../../../services/matricul/matricul.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, startWith, tap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { InputMBJComponent } from '../../communs/input-mbj/input-mbj.component';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-etudiant-ajout',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, FormsModule, InputMBJComponent],
  templateUrl: './etudiant-ajout.component.html',
  styleUrl: './etudiant-ajout.component.scss',
})
export class EtudiantAjoutComponent implements OnInit {
  numeroRegexp: RegExp = /^0(32|33|34|37|38|39)[0-9]{7}$/;
  genres = [
    { value: 'M', label: 'Garçon' },
    { value: 'F', label: 'Fille' },
  ];

  genreEtudiantFormControl = new FormControl(this.genres.at(0)?.value);

  matriculFormControl = new FormControl('', Validators.required);
  matriculErreur!: string;

  mainForm!: FormGroup;
  nomErreur!: string;
  prenomErreur!: string;
  dateNaissanceErreur!: string;
  adresseErreur!: string;

  isMereInconnu: boolean = false;
  isMereInconnuFormControl = new FormControl(false);
  mereFormGroup!: FormGroup;
  nomMereFormControl = new FormControl('');
  nomMereErreur!: string;
  telephoneMereFormControl = new FormControl('');
  telephoneMereErreur!: string;

  isPereInconnu: boolean = false;
  isPereInconnuFormControl = new FormControl(false);
  pereFormGroup!: FormGroup;
  nomPereFormControl = new FormControl('');
  nomPereErreur!: string;
  telephonePereFormControl = new FormControl('');
  telephonePereErreur!: string;

  tuteurFormGroup!: FormGroup;
  nomTuteurFormControl = new FormControl('');
  nomTuteurErreur!: string;
  telephoneTuteurFormControl = new FormControl('');
  telephoneTuteurErreur!: string;

  //information principale sur l'etudiant
  nomEtudiantFormControl = new FormControl('', Validators.required);

  constructor(
    private etudiantService: EtudiantService,
    private activetedRoute: ActivatedRoute,
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
    //récuperation du dernier matricul
    this.activetedRoute.data.subscribe((data) => {
      console.log(
        'numero matricul récuperé par resolver = ',
        data['dernierMatricul']
      );
      this.matriculFormControl.setValue(
        String(Number(data['dernierMatricul']) + 1)
      );
    });

    this.mereFormGroup = new FormGroup({
      nomMere: this.nomMereFormControl,
      telephoneMere: this.telephoneMereFormControl,
      professionMere: new FormControl(''),
    });

    this.pereFormGroup = new FormGroup({
      nomPere: this.nomPereFormControl,
      telephonePere: this.telephonePereFormControl,
      professionPere: new FormControl(''),
    });

    this.tuteurFormGroup = new FormGroup({
      nomTuteur: this.nomTuteurFormControl,
      telephoneTuteur: this.telephoneTuteurFormControl,
      professionTuteur: new FormControl(''),
    });

    console.log('set main form');
    this.mainForm = new FormGroup({
      matriculEtudiant: this.matriculFormControl,
      nomEtudiant: this.nomEtudiantFormControl,
      prenomEtudiant: new FormControl('', Validators.required),
      dateDeNaissanceEtudiant: new FormControl('', [
        Validators.required,
        Validators.pattern(
          /^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/
        ),
      ]),
      adresseEtudiant: new FormControl('', Validators.required),
      genreEtudiant: this.genreEtudiantFormControl,
      mereFormGroup: this.mereFormGroup,
      pereFormGroup: this.pereFormGroup,
      tuteurFormGroup: this.tuteurFormGroup,
      noteSupplementaireEtudiant: new FormControl(''),
      nombreFraternite: new FormControl('0'),
    });

    this.isMereInconnuFormControl.valueChanges.subscribe((value) => {
      if (value !== null) this.isMereInconnu = value;
      console.log('la valeur est. => ' + value);
      if (!this.isMereInconnu) {
        this.nomMereFormControl.addValidators(Validators.required);
      }
    });

    this.isPereInconnuFormControl.valueChanges.subscribe((value) => {
      if (value !== null) this.isPereInconnu = value;
    });
  }

  onSubmit() {
    console.log('submit des valeurs dans nouvel etudiant');

    let valueMainForm = this.mainForm.value;

    if (valueMainForm.matriculEtudiant === '') {
      this.matriculErreur = 'Champs matricul obligatoire';
    } else {
      this.matriculErreur = '';
    }

    if (valueMainForm.nomEtudiant === '') {
      this.nomErreur = 'Champs nom obligatoire';
    } else {
      this.nomErreur = '';
    }

    if (valueMainForm.prenomEtudiant === '') {
      this.prenomErreur = 'Champs prénom(s) obligatoire';
    } else {
      this.prenomErreur = '';
    }

    if (this.mainForm.get('dateDeNaissanceEtudiant')?.hasError('pattern')) {
      this.dateNaissanceErreur =
        'Champs date de naissance de respectte par le format jour/mois/année';
    } else if (valueMainForm.dateDeNaissanceEtudiant === '') {
      this.dateNaissanceErreur = 'Champs date de naissance obligatoire';
    } else {
      this.dateNaissanceErreur = '';
    }

    if (valueMainForm.adresseEtudiant === '') {
      this.adresseErreur = 'Champs adresse obligatoire';
    } else {
      this.adresseErreur = '';
    }

    this.setMereFormGroup();
    this.setPereFormGroup();

    // si le champs est vide on set la valeur a zero 0
    if (valueMainForm.nombreFraternite === '') {
      valueMainForm.nombreFraternite = 0;
    }
    // this.setTuteurFormGroup();
    console.log('is main valid => ' + this.mainForm.valid);
    if (this.mainForm.valid) {
      let etudiantDetail: EtudiantDetail = {
        matricule: String(Number(valueMainForm.matriculEtudiant)),
        nom: valueMainForm.nomEtudiant,
        prenom: valueMainForm.prenomEtudiant,
        dateNaissance: valueMainForm.dateDeNaissanceEtudiant,
        adresse: valueMainForm.adresseEtudiant,
        sexe: valueMainForm.genreEtudiant,
        nomMere: this.mereFormGroup.get('nomMere')?.value,
        telephoneMere: this.mereFormGroup.get('telephoneMere')?.value,
        professionMere: this.mereFormGroup.get('professionMere')?.value,
        nomPere: this.pereFormGroup.get('nomPere')?.value,
        telephonePere: this.pereFormGroup.get('telephonePere')?.value,
        professionPere: this.pereFormGroup.get('professionPere')?.value,
        nomTuteur: this.tuteurFormGroup.get('nomTuteur')?.value,
        telephoneTuteur: this.tuteurFormGroup.get('telephoneTuteur')?.value,
        professionTuteur: this.tuteurFormGroup.get('professionTuteur')?.value,
        noteSupplementaire: valueMainForm.noteSupplementaire,
        nombreFraternite: valueMainForm.nombreFraternite,
      };

      console.log(etudiantDetail);

      this.etudiantService
        .saveNewEtudiant(etudiantDetail)
        .subscribe((response) => {
          if (response.isError) {
            this.matriculErreur = response.message;
            this.toastr.warning(response.message, 'Attention');
          } else {
            this.mainForm.reset();
            let newMatricul = Number(valueMainForm.matriculEtudiant) + 1;
            this.mainForm.get('matricul');
            this.mainForm.get('matriculEtudiant')?.setValue(newMatricul);
            this.mainForm.get('genreEtudiant')?.setValue('M');
            this.toastr.success('Etudiant enregistré.', 'Information');
          }
        });
    } else {
      this.toastr.warning(
        'Les champs obligatoires ne sont pas bien remplis',
        'Attention'
      );
    }
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
  }

  setMereFormGroup() {
    if (!this.isMereInconnu) {
      this.nomMereFormControl.addValidators(Validators.required);
      this.nomMereFormControl.updateValueAndValidity();
      if (this.mereFormGroup.get('nomMere')?.hasError('required')) {
        this.nomMereErreur = 'Champs nom de la mére obligatoire';
      } else {
        this.nomMereErreur = '';
      }

      this.telephoneMereFormControl.addValidators(Validators.required);
      this.telephoneMereFormControl.addValidators(
        Validators.pattern(this.numeroRegexp)
      );
      this.telephoneMereFormControl.updateValueAndValidity();

      if (this.mereFormGroup.get('telephoneMere')?.hasError('required')) {
        this.telephoneMereErreur = 'Champs télephone mére obligatoire';
      } else if (this.mereFormGroup.get('telephoneMere')?.hasError('pattern')) {
        this.telephoneMereErreur =
          "Le format du numero n'est pas correct. Ex: 0330000000";
      } else {
        this.telephoneMereErreur = '';
      }
    } else {
      console.log('test mere inconnu');
      this.telephoneMereFormControl.clearValidators();
      this.nomMereFormControl.clearValidators();
      this.mereFormGroup.get('nomMere')?.setValue('');
      this.telephoneMereFormControl.updateValueAndValidity();
      this.mereFormGroup.get('telephoneMere')?.setValue('');
      this.nomMereFormControl.updateValueAndValidity();
      this.nomMereErreur = '';
      this.telephoneMereErreur = '';
      this.mereFormGroup.get('professionMere')?.setValue('');
    }
  }

  setPereFormGroup() {
    if (!this.isPereInconnu) {
      this.nomPereFormControl.addValidators(Validators.required);
      this.nomPereFormControl.updateValueAndValidity();
      if (this.pereFormGroup.get('nomPere')?.hasError('required')) {
        this.nomPereErreur = 'Champs nom du pére obligatoire';
      } else {
        this.nomPereErreur = '';
      }

      this.telephonePereFormControl.addValidators([
        Validators.required,
        Validators.pattern(this.numeroRegexp),
      ]);
      console.log('test pere inconnu');
      this.telephonePereFormControl.updateValueAndValidity();
      if (this.pereFormGroup.get('telephonePere')?.hasError('required')) {
        this.telephonePereErreur = 'Champs télephone du pére obligatoire';
      } else if (this.pereFormGroup.get('telephonePere')?.hasError('pattern')) {
        this.telephonePereErreur =
          "Le format du numero n'est pas correct. Ex: 0330000000";
      } else {
        this.telephonePereErreur = '';
      }
    } else {
      this.nomPereErreur = '';
      this.pereFormGroup.get('nomPere')?.setValue('');
      this.nomPereFormControl.clearValidators();
      this.nomPereFormControl.updateValueAndValidity();

      this.telephonePereErreur = '';
      this.telephonePereFormControl.clearValidators();
      this.telephonePereFormControl.updateValueAndValidity();
      this.pereFormGroup.get('telephonePere')?.setValue('');
      this.pereFormGroup.get('professionPere')?.setValue('');
    }
  }

  setTuteurFormGroup() {
    if (this.isMereInconnu && this.isPereInconnu) {
      this.nomTuteurFormControl.addValidators(Validators.required);
      this.nomTuteurFormControl.updateValueAndValidity();
      if (this.tuteurFormGroup.get('nomTuteur')?.hasError('required')) {
        this.nomTuteurErreur = 'Champs nom du/de la tuteur(trice) obligatoire';
      } else {
        this.nomTuteurErreur = '';
      }

      this.telephoneTuteurFormControl.addValidators([
        Validators.required,
        Validators.pattern(this.numeroRegexp),
      ]);
      this.telephoneTuteurFormControl.updateValueAndValidity();
      if (this.tuteurFormGroup.get('telephoneTuteur')?.hasError('required')) {
        this.telephoneTuteurErreur =
          'Champs télephone du/de la tuteur(trice) obligatoire';
      } else if (
        this.tuteurFormGroup.get('telephoneTuteur')?.hasError('pattern')
      ) {
        this.telephoneTuteurErreur =
          "Le format du numero n'est pas correct. Ex: 0330000000";
      } else {
        this.telephoneTuteurErreur = '';
      }
    } else {
      this.nomTuteurErreur = '';
      this.tuteurFormGroup.get('nomTuteur')?.setValue('');
      this.nomTuteurFormControl.clearValidators();
      this.nomTuteurFormControl.updateValueAndValidity();

      this.telephoneTuteurFormControl.clearValidators();
      this.telephoneTuteurFormControl.updateValueAndValidity();
      this.telephoneTuteurErreur = '';
      this.tuteurFormGroup.get('telephoneTuteur')?.setValue('');

      this.tuteurFormGroup.get('professionTuteur')?.setValue('');
    }
  }
}
