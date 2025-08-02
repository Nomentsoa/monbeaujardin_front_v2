import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-etudiant-item',
  standalone: true,
  imports: [],
  templateUrl: './etudiant-item.component.html',
  styleUrl: './etudiant-item.component.scss',
})
export class EtudiantItemComponent implements OnInit {
  ngOnInit(): void {
    console.log(' la valeur du toket ' + this.cookieService.get('accessToken'));
  }

  constructor(private cookieService: CookieService) {}
}
