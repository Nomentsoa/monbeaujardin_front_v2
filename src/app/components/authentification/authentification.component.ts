import { Component, OnInit } from '@angular/core';
import { AuthentificationService } from '../../services/authentification/authentification.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-authentification',
  standalone: true,
  imports: [],
  templateUrl: './authentification.component.html',
  styleUrl: './authentification.component.scss',
})
export class AuthentificationComponent implements OnInit {
  ngOnInit(): void {}

  constructor(private authentificationService: AuthentificationService) {}

  doAuthentification() {
    this.authentificationService.doAuthentification({
      username: 'laza',
      password: 'laza',
      withRefreshToken: false,
      grantType: 'password',
    });
  }
}
