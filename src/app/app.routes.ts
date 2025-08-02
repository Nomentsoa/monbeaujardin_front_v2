import { Routes } from '@angular/router';
import { AuthentificationComponent } from './components/authentification/authentification.component';
import { EtudiantItemComponent } from './components/etudiant/etudiant-item/etudiant-item.component';
import { guardGuard } from './guards/guard.guard';
import { EtudiantListComponent } from './components/etudiant/etudiant-list/etudiant-list.component';
import { PrincipalComponent } from './principal/principal.component';
import { EtudiantAjoutComponent } from './components/etudiant/etudiant-ajout/etudiant-ajout.component';
import { matriculResolver } from './resolvers/matricul.resolver';

export const routes: Routes = [
  { path: '', component: AuthentificationComponent },
  {
    path: 'principal',
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
      {
        path: 'etudiantAjout',
        component: EtudiantAjoutComponent,
        resolve: {
          dernierMatricul: matriculResolver,
        },
      },
    ],
  },
];
