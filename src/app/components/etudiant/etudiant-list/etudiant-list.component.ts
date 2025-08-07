import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { EtudiantService } from '../../../services/etudiants/etudiant.service';
import { Observable, tap } from 'rxjs';
import { PagedEtudiantList } from '../../../models/etudiant/pagedEtudiantList.model';
import { AsyncPipe, NgClass } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-etudiant-list',
  standalone: true,
  imports: [AsyncPipe, FormsModule, NgClass],
  templateUrl: './etudiant-list.component.html',
  styleUrl: './etudiant-list.component.scss',
})
export class EtudiantListComponent implements OnInit {
  recherche: string = '';
  currentPage: number = 0;
  pageSize = 2;

  compteurGroupPage: number = 1;
  totalPage!: number;

  pagedEtudiantListObservable$!: Observable<PagedEtudiantList>;

  constructor(
    private cookieService: CookieService,
    private etudiantService: EtudiantService
  ) {}

  ngOnInit(): void {
    this.getList(this.recherche, this.currentPage);
  }

  onCherche() {
    console.log('la valeur de la recherche => ' + this.recherche);
    this.getList(this.recherche, this.currentPage);
    this.pagedEtudiantListObservable$ = this.etudiantService
      .getPagedEtudiantList({
        keyword: this.recherche,
        page: 0,
        size: this.pageSize,
      })
      .pipe(
        tap((value) => {
          this.totalPage = value.totalPages;
          this.currentPage = value.currentPage;
        })
      );
  }

  onChangePage(page: number) {
    console.log('click on change page');
    this.getList(this.recherche, page);
  }

  onSuivant(currentPage: number) {
    if (currentPage == 7 * this.compteurGroupPage)
      this.compteurGroupPage = this.compteurGroupPage + 1;
    this.getList(this.recherche, currentPage);
  }

  onPrecedent(currentPage: number) {
    if (currentPage != 0) {
      if (currentPage == (7 - 1) * (this.compteurGroupPage - 1))
        this.compteurGroupPage = this.compteurGroupPage - 1;
    }

    this.getList(this.recherche, currentPage);
  }

  getList(keyWord: string, curruntPage: number) {
    this.pagedEtudiantListObservable$ = this.etudiantService
      .getPagedEtudiantList({
        keyword: keyWord,
        page: curruntPage,
        size: this.pageSize,
      })
      .pipe(
        tap((value) => {
          this.totalPage = value.totalPages;
          this.currentPage = value.currentPage;
        })
      );
  }
}
