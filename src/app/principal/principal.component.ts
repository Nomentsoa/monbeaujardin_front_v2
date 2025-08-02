import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-principal',
  standalone: true,
  imports: [RouterOutlet, CommonModule, RouterLink],
  templateUrl: './principal.component.html',
  styleUrl: './principal.component.scss',
})
export class PrincipalComponent implements OnInit {
  ngOnInit(): void {}

  constructor(private cookieService: CookieService, private router: Router) {}

  onLogOut() {
    this.cookieService.delete('accessToken');
    this.router.navigateByUrl('');
  }
}
