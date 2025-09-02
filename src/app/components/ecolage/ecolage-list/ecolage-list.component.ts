import { Component, OnInit } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-ecolage-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './ecolage-list.component.html',
  styleUrl: './ecolage-list.component.scss',
})
export class EcolageListComponent implements OnInit {
  moisDeLannee = environment.moisDeLanne;

  debutMonBeauJardin = environment.anneeCreationMonBeauJardin;
  jourCourant!: number;
  recherche!: string;
  moisSelected!: number;
  anneeSelected!: string;
  ngOnInit(): void {
    // récupération de la date pour l'affichage dans les champs
    const dateNow = new Date();
    this.jourCourant = dateNow.getDate();
    this.moisSelected =
      dateNow.getMonth() + 1 == 8 ? 9 : dateNow.getMonth() + 1;
    this.anneeSelected = dateNow.getFullYear() + '';
  }

  constructor() {}

  onRecherche() {
    console.log(
      `${this.moisSelected} / ${this.anneeSelected} recherche ${this.recherche}`
    );
  }
}
