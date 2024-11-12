import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { RedirectCommand, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-panel',
  standalone: true,
  imports: [RouterLink,RouterLinkActive],
  templateUrl: './panel.component.html',
  styleUrl: './panel.component.css'
})
export class PanelComponent implements OnInit {
  loged:boolean = false;
  constructor(private authService: AuthService, router:Router, private location: Location){}

  ngOnInit(): void {
    this.isLoged();

  }
  isLoged(): void {
    this.loged = this.authService.isAuthenticated(); // Actualiza el estado de Loged
  }

  logout(): void {
    this.authService.logout(); // Cierra sesión y elimina el token
    this.location.replaceState(this.location.path());  // Elimina la URL de la barra de direcciones


}
}
