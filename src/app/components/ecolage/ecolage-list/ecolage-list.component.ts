import { Component, OnInit } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { CommonModule, NgClass } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ModalPayerEcolageComponent } from '../modal-payer-ecolage/modal-payer-ecolage.component';
import { DateMbJ } from '../../../models/dateMBJ.model';
import { EtudiantDetail } from '../../../models/etudiant/etudiantDetail.model';
import { EtudiantList } from '../../../models/etudiant/etudiantList.model';
import { Observable, tap } from 'rxjs';
import { PagedEtudiantList } from '../../../models/etudiant/pagedEtudiantList.model';
import { EtudiantService } from '../../../services/etudiants/etudiant.service';
import { EcolageService } from '../../../services/ecolage/ecolage.service';
import { PagedEtudiantWithEcolageList } from '../../../models/etudiant/pagedEtudiantWithEcolageList.model';
import { EtudiantItemWithEcolage } from '../../../models/etudiant/etudiantItemWithEcolage.model';
import { Reponse } from '../../../models/reponse.model';

@Component({
  selector: 'app-ecolage-list',
  standalone: true,
  imports: [CommonModule, FormsModule, ModalPayerEcolageComponent],
  templateUrl: './ecolage-list.component.html',
  styleUrl: './ecolage-list.component.scss',
})
export class EcolageListComponent implements OnInit {
  isPopupVisible = false;

  moisDeLannee = environment.moisDeLanne;
  dateSelected: DateMbJ = new DateMbJ();

  debutMonBeauJardin = environment.anneeCreationMonBeauJardin;
  timeStampsNow!: number;

  moisSelected!: number;
  anneeSelected!: string;
  etudiantDetailFromList!: EtudiantList;

  nombreDePageAfficher = environment.nombreDePageAffiche;
  recherche: string = '';
  currentPage: number = 0;
  pageSize = 1;
  etat: string = 'I';

  compteurGroupPage: number = 1;
  totalPage!: number;

  pagedEtudiantWithEcolageList$!: Observable<PagedEtudiantWithEcolageList>;

  ngOnInit(): void {
    this.dateSelected = new DateMbJ();
    // récupération de la date pour l'affichage dans les champs
    const dateNow = new Date();

    const specificDateNow: Date = new Date(
      dateNow.getFullYear(),
      dateNow.getMonth(),
      16,
      0,
      0,
      0,
      0
    );
    this.timeStampsNow = specificDateNow.getTime();

    this.moisSelected =
      dateNow.getMonth() + 1 == 8 ? 9 : dateNow.getMonth() + 1;
    this.anneeSelected = dateNow.getFullYear() + '';

    this.dateSelected.jourCourant = dateNow.getDate();

    console.log(
      dateNow.getDate() + '/' + this.moisSelected + '/' + dateNow.getFullYear()
    );

    //récuperation de la liste de tous les etudiants;
    this.getListEtudiant(this.recherche, 0);
  }

  constructor(private etudiantService: EtudiantService) {}

  onRecherche() {
    this.getListEtudiant(this.recherche, 0);
  }

  showPopupPayer(etudiantDetail: EtudiantList) {
    this.etudiantDetailFromList = etudiantDetail;
    this.dateSelected.anneeCourante = Number(this.anneeSelected);
    this.dateSelected.moisCourant = this.moisSelected;

    this.isPopupVisible = true;
  }

  hidePopupPayer() {
    this.isPopupVisible = false;
  }

  getListEtudiant(keyWord: string, currentPage: number) {
    this.pagedEtudiantWithEcolageList$ = this.etudiantService
      .getPagedEtudiantWithEcolage(
        keyWord,
        'I',
        currentPage,
        this.pageSize,
        this.moisSelected,
        Number(this.anneeSelected)
      )
      .pipe(
        tap((value) => {
          this.totalPage = value.totalPages;
          this.currentPage = value.currentPage;
        })
      );
  }

  onPrecedent(currentPage: number) {
    if (currentPage != 0) {
      if (
        currentPage ==
        (this.nombreDePageAfficher - 1) * (this.compteurGroupPage - 1)
      ) {
        this.compteurGroupPage = this.compteurGroupPage - 1;
      }
    }

    this.getListEtudiant(this.recherche, currentPage);
  }

  onSuivant(currentPage: number) {
    if (currentPage == this.nombreDePageAfficher * this.compteurGroupPage)
      this.compteurGroupPage = this.compteurGroupPage + 1;

    this.getListEtudiant(this.recherche, currentPage);
  }

  onChangePage(page: number) {
    this.getListEtudiant(this.recherche, page);
  }

  testEtatEcolage(etudiant: EtudiantItemWithEcolage): string {
    if (etudiant.payed) {
      return 'secondary';
    } else {
      if (etudiant.jour == 0) {
        const specificDateLimitDefaut: Date = new Date(
          Number(this.anneeSelected),
          this.moisSelected - 1,
          12,
          23,
          59,
          59,
          99
        );
        const timeStampLimitDefaut = specificDateLimitDefaut.getTime();

        if (
          timeStampLimitDefaut + this.jourEnMilliseconde(3) <
          this.timeStampsNow
        ) {
          return 'danger';
        } else if (
          timeStampLimitDefaut + this.jourEnMilliseconde(1) <
          this.timeStampsNow
        ) {
          return 'warning';
        } else {
          return 'secondary';
        }
      } else {
        const specificDateLimitJour: Date = new Date(
          Number(this.anneeSelected),
          this.moisSelected - 1,
          etudiant.jour,
          23,
          59,
          59,
          99
        );
        const timeStampLimitJour = specificDateLimitJour.getTime();

        if (
          timeStampLimitJour + this.jourEnMilliseconde(3) <
          this.timeStampsNow
        ) {
          return 'danger';
        } else if (
          timeStampLimitJour + this.jourEnMilliseconde(1) <
          this.timeStampsNow
        ) {
          return 'warning';
        } else {
          return 'secondary';
        }
      }
    }
  }

  jourEnMilliseconde(nombreJour: number): number {
    return nombreJour * 24 * 60 * 60 * 1000;
  }

  onReponseValuePayEcolage(reponse: Reponse) {
    console.log('mahita reponse tsr mits ato indrayds');
    console.log(
      'reponse => ' + reponse.message + 'isErreur ' + reponse.isError
    );

    this.getListEtudiant(this.recherche, this.currentPage);
  }
}
