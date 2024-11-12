import { CommonModule } from '@angular/common';
import { AuthService } from './../../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterModule } from '@angular/router';
import { AvatarComponent } from '../../../avatar/avatar.component';
import { MatMenuModule } from '@angular/material/menu';

@Component({
  selector: 'app-banner',
  standalone: true,
  imports: [MatButtonModule, RouterModule, CommonModule, AvatarComponent, MatMenuModule],
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css']
})
export class BannerComponent implements OnInit {
  Loged = false;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.isLoged(); // Verifica el estado de autenticación al iniciar
  }

  isLoged(): void {
    this.Loged = this.authService.isAuthenticated(); // Actualiza el estado de Loged
  }

  logout(): void {
    this.authService.logout(); // Cierra sesión y elimina el token
    this.isLoged(); // Actualiza el estado de Loged
  }
}
