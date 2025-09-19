import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { EtudiantList } from '../../../models/etudiant/etudiantList.model';
import { DateMbJ } from '../../../models/dateMBJ.model';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { environment } from '../../../../environments/environment.development';
import { FormsModule } from '@angular/forms';
import { EcolageService } from '../../../services/ecolage/ecolage.service';
import { PayEcolage } from '../../../models/ecolage/payEcolage.model';
import { Reponse } from '../../../models/reponse.model';

@Component({
  selector: 'app-modal-payer-ecolage',
  standalone: true,
  imports: [MatDatepickerModule, FormsModule],
  templateUrl: './modal-payer-ecolage.component.html',
  styleUrl: './modal-payer-ecolage.component.scss',
})
export class ModalPayerEcolageComponent implements OnInit {
  @Output() close = new EventEmitter<void>();
  @Output() reponseValue = new EventEmitter<Reponse>();
  @Input() etudiantDetail!: EtudiantList;
  @Input() dateCourant!: DateMbJ;

  payEcolageRequest!: PayEcolage;

  maxJourMois = 30;

  jourSelected!: number;
  moisSelected!: number;
  anneeSelected!: number;
  isPayed: boolean = false;

  moisDeLannee = environment.moisDeLanne;
  debutMonBeauJardin = environment.anneeCreationMonBeauJardin;

  constructor(private eolageService: EcolageService) {}

  ngOnInit(): void {
    console.log(this.dateCourant);
    this.moisSelected = this.dateCourant.moisCourant!;
    this.anneeSelected = this.dateCourant.anneeCourante!;
    this.jourSelected = this.dateCourant.jourCourant!;
    this.maxJourMois = this.getNombreJourByMounthAndYear(
      this.moisSelected,
      this.anneeSelected
    );
  }

  closePopup() {
    this.close.emit();
  }

  payEcolage() {
    console.log('payed => ' + this.isPayed);
    let payEcolageRequest: PayEcolage = {
      idEtudiant: this.etudiantDetail.id,
      jour: this.jourSelected,
      annee: this.anneeSelected,
      mois: this.moisSelected,
      payed: this.isPayed,
    };

    this.eolageService.payEcolage(payEcolageRequest).subscribe((reponse) => {
      this.reponseValue.emit(reponse);
      this.close.emit();
    });
  }

  changeDate() {
    console.log('le mois a changé' + this.moisSelected);
    this.maxJourMois = this.getNombreJourByMounthAndYear(
      this.moisSelected,
      this.anneeSelected
    );

    if (this.jourSelected > this.maxJourMois)
      this.jourSelected = this.maxJourMois;
  }

  getNombreJourByMounthAndYear(mois: number, annee: number): number {
    return new Date(annee, mois, 0).getDate();
  }
}
