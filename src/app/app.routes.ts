import { Routes } from '@angular/router';
import { AuthentificationComponent } from './components/authentification/authentification.component';
import { EtudiantItemComponent } from './components/etudiant/etudiant-item/etudiant-item.component';
import { guardGuard } from './guards/guard.guard';
import { EtudiantListComponent } from './components/etudiant/etudiant-list/etudiant-list.component';

export const routes: Routes = [
  { path: 'authentification', component: AuthentificationComponent },
  {
    path: 'etudiant',
    component: EtudiantItemComponent,
    canActivate: [guardGuard],
  },
  {
    path: 'etudiantList',
    component: EtudiantListComponent,
    canActivate: [guardGuard],
  },
];
