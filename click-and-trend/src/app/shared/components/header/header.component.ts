import { Component,Output, EventEmitter, OnInit } from '@angular/core';
import { BannerComponent } from "../banner/banner.component";
import {MatIconModule} from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { RouterLink,Router } from '@angular/router';
import { AuthService } from './../../../services/auth.service';
import { DropdownComponent } from "../../../dropdown/dropdown.component";
import { AvatarComponent } from '../../../avatar/avatar.component';
import { MatMenuModule } from '@angular/material/menu';


@Component({
  selector: 'app-header',
  standalone: true,
  imports: [BannerComponent, MatIconModule, CommonModule, RouterLink, DropdownComponent,AvatarComponent,MatMenuModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  isDropdownOpen = false; // Estado del dropdown
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
