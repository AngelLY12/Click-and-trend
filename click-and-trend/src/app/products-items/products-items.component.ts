import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { CategoryService } from '../services/category.service';
import { ProductItemsService } from '../services/product-items.service';

@Component({
  selector: 'app-products-items',
  standalone: true,
  imports: [MatButtonModule],
  templateUrl: './products-items.component.html',
  styleUrl: './products-items.component.css'
})
export class ProductsItemsComponent implements OnInit{
  selectedItem: string = '';
  hombres: any[] = [];
  mujeres: any[] = [];
  ninos: any[] = [];
  errorMessage: string = ''

  constructor(private category: CategoryService, private productService: ProductItemsService) {}

  ngOnInit(): void {
    // Verificar si estamos en el navegador
    if (typeof window !== 'undefined') {
      // Acceder a localStorage solo si estamos en el navegador
      const storedGender = localStorage.getItem('selectedItem');
      if (storedGender) {
        this.selectedItem = storedGender;
        this.loadProductsByGender(this.selectedItem); // Cargar productos según el género
      } else {
        console.warn("No gender selected in localStorage.");
      }
    }
  }


  loadProductsByGender(gender: string): void {
    const formattedGender = gender.toUpperCase();
    console.log('Formatted gender:', formattedGender); // Depuración

    this.productService.getProductsByGender(formattedGender).subscribe(
      (data) => {
        if (formattedGender === 'HOMBRES') {
          this.hombres = data;
          console.log('Asignado a hombres:', this.hombres); // Depuración
        } else if (formattedGender === 'MUJERES') {
          this.mujeres = data;
          console.log('Asignado a mujeres:', this.mujeres); // Depuración
        } else if (formattedGender === 'NIÑOS') {
          this.ninos = data;
          console.log('Asignado a niños:', this.ninos); // Depuración
        } else {
          console.warn('Género no reconocido:', formattedGender); // Depuración
        }

        this.errorMessage = '';
        console.log('Productos obtenidos:', data);
      },
      (error) => {
        this.errorMessage = 'Error retrieving products';
        console.error('Error:', error);
      }
    );
  }

}
