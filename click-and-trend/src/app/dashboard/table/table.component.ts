import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ProductItemsService } from '../../services/product-items.service';
import { Router, RouterOutlet } from '@angular/router';
import { RouterLink } from '@angular/router';
import { RouterLinkActive } from '@angular/router';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [CommonModule,RouterLink,RouterLinkActive,RouterOutlet],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css'
})
export class TableComponent implements OnInit {
  products: any[] = [];
  isModalOpen:boolean=false;

  constructor(private productService: ProductItemsService, private router: Router, private notificationService:NotificationService) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  // Método para cargar todos los productos
  loadProducts(): void {
    this.productService.getAllProducts().subscribe(
      data => {
        this.products = data;
      },
      error => {
        console.error('Error al cargar productos:', error);
      }
    );
  }

  // Método para eliminar un producto
  deleteProduct(id: number): void {
    this.productService.deleteProduct(id).subscribe(
      () => {
        setTimeout(() =>this.notificationService.showSuccess("Producto eliminado con exito") , 100); // Redirige al login después de 2 segundos
        this.products = this.products.filter(product => product.id !== id);
        setTimeout(() => window.location.reload() , 800);
        console.log('Producto eliminado correctamente');
      },
      error => {
        console.error('Error al eliminar producto:', error);
      }

    );

  }

  // Método para editar un producto
  editProduct(product: any): void {
    // Aquí podrías redirigir a un formulario de edición y pasar el producto como parámetro
    this.router.navigate(['/admin-dashboard/edit-product', product.id]);
  }

  // Método para añadir un nuevo producto
  addProduct(): void {
    this.router.navigate(['/admin-dashboard/add-product']);
  }

  openModal() {
    this.isModalOpen = true;
  }

  // Método para cerrar el modal
  closeModal() {
    this.isModalOpen = false;
  }
}
