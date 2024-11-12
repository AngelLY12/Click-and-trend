import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Notification{
  type: 'success'|'error'|'warning';
  message:string;
}


@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private NotificationSubject = new BehaviorSubject<Notification | null>(null);
  notification$= this.NotificationSubject.asObservable();

  showSuccess(message:string){
    this.NotificationSubject.next({type:'success',message});
  }
  showError(message:string){
    this.NotificationSubject.next({type:'error',message});
  }
  showWarning(message:string){
    this.NotificationSubject.next({type:'warning',message});
  }
  clearNotification(){
    this.NotificationSubject.next(null);
  }

  constructor() { }
}
