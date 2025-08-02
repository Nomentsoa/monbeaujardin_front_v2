import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-etudiant-list',
  standalone: true,
  imports: [],
  templateUrl: './etudiant-list.component.html',
  styleUrl: './etudiant-list.component.scss',
})
export class EtudiantListComponent implements OnInit {
  ngOnInit(): void {}

  constructor(private cookieService: CookieService) {}
}
