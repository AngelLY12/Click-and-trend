import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-users-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './users-table.component.html',
  styleUrl: './users-table.component.css'
})
export class UsersTableComponent implements OnInit{
  users: any[] = [];
  constructor(private userService: UsersService, private router: Router) {}
  ngOnInit(): void {
    this.loadProducts();
  }

  // Método para cargar todos los productos
  loadProducts(): void {
    this.userService.getAllUsers().subscribe(
      data => {
        this.users = data;
      },
      error => {
        console.error('Error al cargar productos:', error);
      }
    );
  }

}
