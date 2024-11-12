import { NotificationService } from './notification.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private LOGIN_URL = 'http://localhost:8080/auth/login';
  private REGISTER_URL= 'http://localhost:8080/auth/register';
  private tokenKey = 'authToken';

  constructor(private httpClient: HttpClient, private router: Router, private notificationService: NotificationService) { }

  login(username: string, password: string): Observable<any> {
    return this.httpClient.post<any>(this.LOGIN_URL, { username, password }).pipe(
      tap(response => {
        if (response.token) {
          this.setToken(response.token);
          const roles = this.getRolesFromToken(response.token);
          if (roles.includes('ADMIN')) {
            setTimeout(() =>this.notificationService.showSuccess('Inicio de sesión exitoso.') , 500); // Redirige al login después de 2 segundos
            setTimeout(() =>this.router.navigate(['/admin-dashboard/table']),1500);
            setTimeout(() =>window.location.reload() , 2000); // Redirige al login después de 2 segundos


          } else {
            setTimeout(() =>this.notificationService.showSuccess('Inicio de sesión exitoso.') , 500); // Redirige al login después de 2 segundos
            setTimeout(() =>this.router.navigate(['/home']),1500); // Redirige al login después de 2 segundos
            setTimeout(() =>window.location.reload() , 2000); // Redirige al login después de 2 segundos

          }
        }
      })
    );
  }

  getRolesFromToken(token: string): string[] {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      console.log("Roles extraídos del token:", payload.role); // Mensaje de depuración
      return Array.isArray(payload.role) ? payload.role : [payload.role];
    } catch (e) {
      console.error("Error al extraer roles del token:", e);
      return [];
    }
  }
  getUsernameFromToken(token:string): string[]{
    try{
      const payload = JSON.parse(atob(token.split('.')[1]));
      console.log("Usuario extraido:",payload.sub);
      return Array.isArray(payload.sub)? payload.sub: [payload.sub];
    }catch(e){
      console.error("Error al extraer el usuario:", e);
      return [];
    }

  }



  private setToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

   getToken(): string | null {
    if (typeof window === 'undefined') {
      return null; // or handle this case appropriately
    }
    return localStorage.getItem(this.tokenKey);
  }

  isAuthenticated(): boolean {
    const token = this.getToken();
    if (!token) {
      return false;
    }

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const exp = payload.exp * 1000;
      return Date.now() < exp;
    } catch (e) {
      return false;  // Si el token es inválido o tiene un formato incorrecto, lo consideramos no válido
    }
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
    setTimeout(() =>this.notificationService.showSuccess('Sesión cerrada exitosamente.') , 500); // Redirige al login después de 2 segundos
    setTimeout(() =>this.router.navigate(['/home']),1500);
    setTimeout(() =>window.location.reload() , 2000); // Redirige al login después de 2 segundos

  }


  register(username: string, password: string, firstname: string): Observable<any> {
    const registerData = { username, password, firstname };
    return this.httpClient.post<any>(this.REGISTER_URL, registerData);
  }

}
