import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NotificationService, Notification } from '../../services/notification.service';

@Component({
  selector: 'app-notifications',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './notifications.component.html',
  styleUrl: './notifications.component.css'
})
export class NotificationsComponent {
  notification: Notification | null = null;

  constructor(private notificationService: NotificationService) {}

  ngOnInit(): void {
    this.notificationService.notification$.subscribe((notification) => {
      this.notification = notification;
      if (notification) {
        setTimeout(() => this.closeNotification(), 3000); // Oculta la notificación después de 3 segundos
      }
    });
  }

  closeNotification() {
    this.notificationService.clearNotification();
  }
}
