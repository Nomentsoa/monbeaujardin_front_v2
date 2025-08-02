import { Component, OnInit } from '@angular/core';
import { AuthentificationService } from '../../services/authentification/authentification.service';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-authentification',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './authentification.component.html',
  styleUrl: './authentification.component.scss',
})
export class AuthentificationComponent implements OnInit {
  isErreurUserName: boolean = false;
  isErreurPassword: boolean = false;
  messageErreur!: string;
  loginFormGroup: FormGroup = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });
  ngOnInit(): void {}

  constructor(
    private authentificationService: AuthentificationService,
    private router: Router,
    private cookieService: CookieService
  ) {}

  onSubmit() {
    console.log(
      'nom utilisateur = ' +
        this.loginFormGroup.value.username +
        ' password ' +
        this.loginFormGroup.value.password
    );

    this.isErreurPassword = false;
    this.isErreurUserName = false;

    if (this.loginFormGroup.get('username')?.hasError('required')) {
      this.isErreurUserName = true;
      this.messageErreur = "Le champ utilisateur n'est pas rempli correctement";
    }

    if (this.loginFormGroup.get('password')?.hasError('required')) {
      this.isErreurPassword = true;
      this.messageErreur =
        "Le champ mot de passe n'est pas rempli correctement";
    }

    if (
      this.loginFormGroup.get('password')?.hasError('required') &&
      this.loginFormGroup.get('username')?.hasError('required')
    ) {
      this.messageErreur =
        'Les champs utilisateur et mot de passe ne sont pas remplis correctement';
    }

    if (!this.isErreurUserName && !this.isErreurPassword) {
      this.authentificationService
        .doAuthentification({
          username: this.loginFormGroup.value.username,
          password: this.loginFormGroup.value.password,
          withRefreshToken: false,
          grantType: 'password',
        })
        .subscribe({
          next: (value) => {
            console.log('la valeur du token est: ' + value.accessToken);
            this.authentificationService.setToken(value.accessToken);
            this.router.navigate(['principal/etudiant']);
            this.cookieService.set('accessToken', value.accessToken, {
              sameSite: 'Strict',
              secure: true,
            });
          },
          error: (err) => {
            console.log('erreur sur la recuperation du token: ' + err);
            this.isErreurPassword = true;
            this.isErreurUserName = true;
            this.messageErreur = 'Utilisateur ou mot de passe incorrect!';
          },
        });
    }
  }
}
