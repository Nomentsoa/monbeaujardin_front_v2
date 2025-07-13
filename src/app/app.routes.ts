import { Routes } from '@angular/router';
import { AuthentificationComponent } from './components/authentification/authentification.component';
import { EtudiantItemComponent } from './components/etudiant/etudiant-item/etudiant-item.component';
import { guardGuard } from './guards/guard.guard';
import { EtudiantListComponent } from './components/etudiant/etudiant-list/etudiant-list.component';
import { PrincipalComponent } from './principal/principal.component';

export const routes: Routes = [
  { path: '', component: AuthentificationComponent },
  {
    path: 'pricipal',
    component: PrincipalComponent,
    canActivate: [guardGuard],
    children: [
      {
        path: 'etudiant',
        component: EtudiantItemComponent,
      },
      {
        path: 'etudiantList',
        component: EtudiantListComponent,
      },
    ],
  },
];
