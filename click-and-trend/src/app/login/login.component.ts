import { FormsModule } from '@angular/forms';
import { AuthService } from './../services/auth.service';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NotificationService } from '../services/notification.service';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MatButtonModule,MatIconModule,RouterLink, FormsModule,CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  username: string ='';
  password: string ='';
  errorMessage: string = ''; // Para almacenar el mensaje de error
  successMessage:string='';
  constructor(private AuthService: AuthService, private router: Router, private notificationService: NotificationService){

  }
  formularioLleno(): boolean {
    if (!this.username.trim() || !this.password.trim() ) {
      setTimeout(() => this.notificationService.showWarning('Debes llenar todo el formulario.'), 500);
      return false;
    }
    return true;
  }
  login(): void {
    if (!this.formularioLleno()) {
      this.errorMessage = 'Debes llenar todo el formulario';

      setTimeout(() => {
        this.errorMessage = '';
      }, 2000);
      return;
    }
    this.AuthService.login(this.username, this.password).subscribe({
      error: (error) => {
        if (error.status === 401) {
          this.notificationService.showWarning("Credenciales invalidas. Intentalo de nuevo.");
        } else {
          this.notificationService.showError("Ha ocurrido un error. Por favor intentalo más tarde.");
          console.error("Error:", error);
        }
      }
    });

  }


}
