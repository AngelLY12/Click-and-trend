import { Component,Input,Output,EventEmitter, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';  // <-- Importa CommonModule
import { RouterLink } from '@angular/router';
import { CategoryService } from '../services/category.service';
import { MatButtonModule } from '@angular/material/button';
import {MatMenuModule, MatMenuTrigger} from '@angular/material/menu';

@Component({
  selector: 'app-dropdown',
  standalone: true,
  imports: [CommonModule,RouterLink,MatButtonModule,MatMenuModule],
  templateUrl: './dropdown.component.html',
  styleUrl: './dropdown.component.css'
})
export class DropdownComponent {

  constructor(private category: CategoryService) {}

  // Método para cambiar el valor del item seleccionado
  selectItem(item: string) {
    this.category.selectItem(item);
  }

}
