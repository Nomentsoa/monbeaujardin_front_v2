import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { EtudiantDetail } from '../../../models/etudiant/etudiantDetail.model';
import { EtudiantService } from '../../../services/etudiants/etudiant.service';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { AsyncPipe } from '@angular/common';
import { InputMBJComponent } from '../../communs/input-mbj/input-mbj.component';

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

  mainForm!: FormGroup;
  matriculEtutiantFormControl = new FormControl('');
  genreEtudiantFormControl = new FormControl('');

  constructor(
    private activatedRoute: ActivatedRoute,
    private etudiantService: EtudiantService
  ) {}
  ngOnInit(): void {
    this.idEtudiant = this.activatedRoute.snapshot.params['id'];
    this.etudiantDetail$ = this.etudiantService
      .getEtudiantDetailById(this.idEtudiant)
      .pipe(
        tap((etudiantDetail) => {
          this.matriculEtutiantFormControl.setValue(etudiantDetail.matricule);
          this.genreEtudiantFormControl.setValue(etudiantDetail.sexe);
        })
      );

    this.matriculEtutiantFormControl.disable();
    this.mainForm = new FormGroup({
      matriculEtudiant: this.matriculEtutiantFormControl,
    });
  }

  onSubmit() {}
}
