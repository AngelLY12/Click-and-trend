import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./shared/components/header/header.component";
import { FooterComponent } from "./shared/components/footer/footer.component";
import { DropdownComponent } from './dropdown/dropdown.component';
import { DashboardLayoutComponent } from "./dashboard/dashboard-layout/dashboard-layout.component";
import { AuthService } from './services/auth.service';
import {CloudinaryModule} from '@cloudinary/ng';
// Import the Cloudinary classes.
import {Cloudinary, CloudinaryImage} from '@cloudinary/url-gen';
import { NotificationsComponent } from "./messages/notifications/notifications.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent, DropdownComponent, DashboardLayoutComponent, CloudinaryModule, NotificationsComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'click-and-trend';
  isDropdownOpen = false;
  selectedCategory: string = '';
  isAdmin: boolean = false;
  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.isAdmin = this.authService.isAuthenticated() && this.authService.getRolesFromToken(this.authService.getToken()!).includes('ADMIN');
  }

  // Maneja la apertura del dropdown
  onHoverDropdown(isOpen: boolean) {
    this.isDropdownOpen = isOpen;
  }

  // Maneja la categoría seleccionada
  onCategorySelected(category: string) {
    this.selectedCategory = category;
    console.log("Categoría seleccionada en AppComponent: " + this.selectedCategory);

  }

}
