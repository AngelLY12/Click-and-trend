import { Injectable } from '@angular/core';
import { User } from '../shared/components/interfaces/user';
import { HttpClient,HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private BASE_URL = 'http://localhost:8080/api/v1/user';

  constructor(private http: HttpClient) { }

  getAllUsers(): Observable<any[]> {
    return this.http.get<any[]>(`${this.BASE_URL}/all`);
  }
  getUser(username:string): Observable<User> {
    if (!username) {
      throw new Error('El email es requerido');

    }
    return this.http.get<User>(`${this.BASE_URL}/get/${username}`);
  }
  checkEmail(username: string): Observable<boolean> {
    return this.http.get<boolean>(`${this.BASE_URL}/check-email/${username}`);
  }

  updateUser(username: string, updatedUser: User): Observable<User> {
    return this.http.patch<User>(`${this.BASE_URL}/update/${username}`, updatedUser);
  }
  deleteUser(username: string): Observable<User> {
    return this.http.delete<User>(`${this.BASE_URL}/delete/${username}`);
  }


}
