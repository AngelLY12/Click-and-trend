import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NotificationService } from '../services/notification.service';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterLink,CommonModule, FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  username: string = '';
  password: string = '';
  confirmPassword: string = '';
  firstname: string = '';
  successMessage: string = '';
  errorMessage: string = '';
  passwordMismatch: boolean = true;

  isValidEmail: boolean = false;
  isValidPassword: boolean = false;
  isValidConfirmPassword: boolean = false;
  isValidName: boolean = false;
  iserrorMessage:boolean=false;

  constructor(private authService: AuthService, private router: Router,
    private notificationService: NotificationService,
    private user: UsersService) {}
    passwordFocused: boolean = false;  // Para mostrar/ocultar los requerimientos
    requirements: boolean[] = [false, false, false, false];  // Array para cada requisito

    showPasswordRequirements() {
      this.passwordFocused = true;
      this.validatePassword();  // Validar inmediatamente si la contraseña ya tiene algo
    }

    hidePasswordRequirements() {
      this.passwordFocused = false;
    }


    validatePassword() {
      this.requirements[0] = this.password.length >= 8;

      // Validar que tiene al menos una letra mayúscula
      this.requirements[1] = /[A-Z]/.test(this.password);

      // Validar que tiene al menos una letra minúscula
      this.requirements[2] = /[a-z]/.test(this.password);

      this.requirements[3] = /\d/.test(this.password) && /[!@#$%^&*]/.test(this.password);  // Contains at least one digit and one special character

      this.isValidPassword = this.requirements.every(req => req); // Todo debe ser verdadero
      this.isValidConfirmPassword = this.password === this.confirmPassword; // Verificar si las contraseñas coinciden

    }

    formularioLleno(): boolean {
      if (!this.username.trim() || !this.firstname.trim() || !this.password.trim() || !this.confirmPassword.trim()) {
        setTimeout(() => this.notificationService.showWarning('Debes llenar todo el formulario.'), 500);
        return false;
      }
      return true;
    }
    emailValidation():boolean{
      if (!this.username.trim()) {
        this.notificationService.showWarning('El correo es requerido');
        return false;
      }

      const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

      // Verificar si el email cumple con el patrón
      if (!emailPattern.test(this.username)) {
        this.notificationService.showWarning('El correo no es válido');
        return false;
      }
      this.isValidEmail=true;
      return true;
    }

    passwordValidation():boolean {
      if (!this.password.trim()) {
        this.notificationService.showWarning('La contraseña es requerida');
        return false;
      }

      const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;

      if (!passwordPattern.test(this.password)) {
        this.notificationService.showWarning('La contraseña no cumple con los parametros requeridos.');
        return false;
      }

      // Verificar si la contraseña coincide con la confirmación
      if (this.password !== this.confirmPassword) {
        this.notificationService.showWarning('Las contraseñas no coinciden');
        return false;
      }
      this.isValidPassword=true;
      return true;
    }
    nameValidation() {
      // Verificar si el nombre no está vacío
      if (!this.firstname.trim()) {
        this.notificationService.showWarning('El nombre es requerido');
        return false;
      }

      // Expresión regular para validar que solo contenga letras (mayúsculas y minúsculas)
      const namePattern = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/;

      // Verificar si el nombre cumple con el patrón
      if (!namePattern.test(this.firstname)) {
        this.notificationService.showWarning('El nombre solo debe contener letras y espacios');
        return false;
      }

      // Validar que el nombre tenga al menos 2 caracteres
      if (this.firstname.length < 2) {
        this.notificationService.showWarning('El nombre debe tener al menos 2 caracteres');
        return false;
      }
      this.isValidName=true;
      return true;
    }

    register(): void {
      if (!this.formularioLleno()) {
        this.errorMessage = 'Debes llenar todo el formulario';

        setTimeout(() => {
          this.errorMessage = '';
        }, 2000);
        return;
      }

      if (!this.emailValidation()) {
        this.errorMessage = 'El correo esta vacio o no es valido';
        setTimeout(() => {
          this.errorMessage = '';
        }, 2000);
        return;
      }

      // Validación del correo con la base de datos
      this.user.checkEmail(this.username).subscribe({
        next: (user) => {
          if (user) {  // Si el usuario existe
            this.notificationService.showWarning('El correo ya está asociado a una cuenta.');
            return;
          }

          // Proceder con el registro si el correo no existe
          if (!this.passwordValidation()) {
            this.passwordMismatch = false;
            return;
          }

          if (!this.nameValidation()) {
            this.errorMessage = 'El campo nombre no debe estar vacío y solo debe contener letras';
            setTimeout(() => {
              this.errorMessage = '';
            }, 2000);
            return;
          }

          this.passwordMismatch = true;

          // Continuar con el registro
          this.authService.register(this.username, this.password, this.firstname).subscribe({
            next: () => {
              this.successMessage = '¡Registro exitoso! Ahora puedes iniciar sesión.';
              this.errorMessage = '';
              setTimeout(() => this.router.navigate(['/login']), 1000);
              setTimeout(() => this.notificationService.showSuccess('Cuenta creada exitosamente.'), 2000);
            },
            error: (error) => {
              this.errorMessage = error.status === 400 ? 'Error en el registro. Inténtalo nuevamente.' : 'Ocurrió un error inesperado.';
              this.successMessage = '';
              setTimeout(() => this.notificationService.showSuccess('Ocurrió un error inesperado.'), 2000);
            }
          });
        },
        error: (error) => {
          this.notificationService.showWarning('Error al verificar el correo.');
        }
      });
    }

}
