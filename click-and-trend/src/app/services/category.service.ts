import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private readonly localStorageKey = 'selectedItem';

  private selectedItemSource = new BehaviorSubject<string>(this.getInitialItem());
  selectedItem$ = this.selectedItemSource.asObservable();

  constructor() {}

  // Método para actualizar el valor y almacenarlo en localStorage (si está disponible)
  selectItem(item: string) {
    this.selectedItemSource.next(item);
    if (this.isLocalStorageAvailable()) {
      localStorage.setItem(this.localStorageKey, item);
    }
  }

  // Método para obtener el valor inicial de localStorage (si está disponible)
  private getInitialItem(): string {
    if (this.isLocalStorageAvailable()) {
      return localStorage.getItem(this.localStorageKey) || '';
    }
    return '';
  }

  // Método para verificar si localStorage está disponible
  private isLocalStorageAvailable(): boolean {
    try {
      const test = 'test';
      localStorage.setItem(test, test);
      localStorage.removeItem(test);
      return true;
    } catch (error) {
      return false;
    }
  }
}
