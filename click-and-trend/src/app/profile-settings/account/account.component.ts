import { User } from './../../shared/components/interfaces/user';
import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { NotificationService } from '../../services/notification.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-account',
  standalone: true,
  imports: [CommonModule,FormsModule, MatButtonModule],
  templateUrl: './account.component.html',
  styleUrl: './account.component.css'
})
export class AccountComponent implements OnInit {
  usuario: User ={};
  isEditingFirstname = false;
  isEditingLastname = false;
  isEditingAge = false;
  isEditingPassword = false;

  username:string='';
  newUser:User={};
  isModalOpen:boolean=false;
  constructor(private userService: UsersService, private authService: AuthService, private notificationService: NotificationService
    ,private router:Router
  ) {}

  ngOnInit(): void {
    if (typeof window !== 'undefined' && window.localStorage) {
      const token = localStorage.getItem('authToken');
    if (token) {
      const usernames = this.authService.getUsernameFromToken(token);
      this.username = usernames[0] || '';
      if (this.username) {
        this.loadData(this.username);
      }
    } else {
      console.error("Token not found");
    }
    }

  }

  loadData(username: string) {
    this.userService.getUser(username).subscribe(
      (data: User) => {
        this.usuario = data;
      },
      error => {
        setTimeout(() =>this.notificationService.showError("Ha ocurrido un error cargando los datos" + error) , 200); // Redirige al login después de 2 segundos
      }
    );
  }
  toggleEdit(field: string): void {
    if (field === 'firstname') {
      this.isEditingFirstname = !this.isEditingFirstname;
    } else if (field === 'lastname') {
      this.isEditingLastname = !this.isEditingLastname;
    } else if (field === 'age') {
      this.isEditingAge = !this.isEditingAge;
    }
    else if (field === 'password') {
      this.isEditingPassword = !this.isEditingPassword;
    }
  }

  updateUser() {
    if (this.username) {
      this.userService.updateUser(this.username, this.usuario).subscribe(
        response => {
          setTimeout(() =>this.notificationService.showSuccess("Usuario actualizado con exito") , 500); // Redirige al login después de 2 segundos
          setTimeout(() =>window.location.reload() , 1500); // Redirige al login después de 2 segundos
          // Actualiza el usuario con los nuevos datos recibidos del backend
          this.usuario = response;
        },
        error => {
          setTimeout(() =>this.notificationService.showError("Ha ocurrido un error al actualizar" + error) , 500); // Redirige al login después de 2 segundos
        }
      );
    }
  }
  deleteUser(){
    if(this.username){
      this.userService.deleteUser(this.username).subscribe(
        ()=>{
          setTimeout(() =>this.notificationService.showSuccess("Usuario eliminado con exito") , 500); // Redirige al login después de 2 segundos
          setTimeout(() => this.router.navigate(['/login']) , 1500); // Redirige al login después de 2 segundos

        },
        error=>{
          setTimeout(() =>this.notificationService.showError("Ha ocurrido un error al eliminar el usuario" + error) , 500); // Redirige al login después de 2 segundos
        }
      );
    }
  }
  openModal() {
    this.isModalOpen = true;
  }

  // Método para cerrar el modal
  closeModal() {
    this.isModalOpen = false;
  }
}
