import { Routes } from '@angular/router';
import { AuthentificationComponent } from './components/authentification/authentification.component';
import { guardGuard } from './guards/guard.guard';
import { EtudiantListComponent } from './components/etudiant/etudiant-list/etudiant-list.component';
import { PrincipalComponent } from './principal/principal.component';
import { EtudiantAjoutComponent } from './components/etudiant/etudiant-ajout/etudiant-ajout.component';
import { matriculResolver } from './resolvers/matricul.resolver';
import { EtudiantDetailComponent } from './components/etudiant/etudiant-detail/etudiant-detail.component';
import { EcolageListComponent } from './components/ecolage/ecolage-list/ecolage-list.component';

export const routes: Routes = [
  { path: '', component: AuthentificationComponent },
  {
    path: 'principal',
    component: PrincipalComponent,
    canActivate: [guardGuard],
    children: [
      {
        path: 'etudiantList',
        component: EtudiantListComponent,
      },
      {
        path: 'etudiantAjout',
        component: EtudiantAjoutComponent,
        resolve: {
          dernierMatricul: matriculResolver,
        },
      },
      {
        path: 'etudiant/:id',
        component: EtudiantDetailComponent,
      },
      {
        path: 'ecolage',
        component: EcolageListComponent,
      },
    ],
  },
];
