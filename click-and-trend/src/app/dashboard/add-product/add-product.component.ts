import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ProductItemsService } from '../../services/product-items.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CloudinaryService } from '../../services/cloudinary.service';
import {FileSelectEvent, FileUploadModule} from 'primeng/fileupload';
import { Product } from '../../shared/components/interfaces/product';
import { NotificationService } from '../../services/notification.service';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [CommonModule,FormsModule,FileUploadModule,MatButtonModule],
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.css'
})

export class AddProductComponent {
  selectedFile: File | null = null;
  product: Product = {
    category: '',
    subCategory: '',
    // Otros campos de Product según tu interfaz
  };
  formatSubCategory(subCategory: string): string {
    return subCategory.replace(/_/g, ' ');
  }
  // Define las subcategorías por cada categoría
  subCategories: { [key: string]: string[] } = {
    ROPA: ['ROPA_CASUAL', 'ROPA_DEPORTIVA', 'ROPA_DE PLAYA', 'ABRIGOS_Y_CHAQUETAS', 'ROPA_DE_PUNTO', 'ROPA_FORMAL_DE_INVIERNO'],
    CALZADO: ['SANDALIAS', 'ZAPATILLAS_DEPORTIVAS_LIGERAS', 'MOCASINES', 'BOTAS_DE_CUERO', 'BOTINES', 'ZAPATOS_IMPERMEABLES', 'BOTAS_LARGAS', 'BOTINES_DE_TACÓN', 'BOTAS_IMPERMEABLES', 'SANDALIAS_DE_TACÓN', 'SANDALIAS_PLANAS', 'CALZADO_DE_AGUA', 'BOTAS_DE_LLUVIA', 'BOTINES_FORRADOS'],
    ACCESORIOS: ['RELOJES', 'BRAZALETES', 'PULSERAS', 'ANILLOS']
  };

  // Subcategorías filtradas para la categoría seleccionada
  filteredSubCategories: string[] = [];

  constructor(
    private productService: ProductItemsService,
    private router: Router,
    private cloudinaryService: CloudinaryService,
    private notificationService: NotificationService
  ) {}

  onFileSelected(event: FileSelectEvent): void {
    this.selectedFile = event.files[0];
    console.log('File selected:', this.selectedFile); // Verifica si el archivo está bien cargado
  }

  // Método para actualizar subcategorías basadas en la categoría seleccionada
  onCategoryChange() {
    if(!this.product.category){
      setTimeout(() => this.notificationService.showWarning("Selecciona primero una categoria"), 500);

    }else{
      this.filteredSubCategories = this.subCategories[this.product.category] || [];
      this.product.subCategory = ''; // Reinicia la subcategoría seleccionada
    }

  }

  addProduct(): void {
    if (!this.selectedFile) {
      setTimeout(() => this.notificationService.showWarning("Selecciona una imagen e intente nuevamente"), 500);
    } else {
      this.productService.insertProduct(this.product, this.selectedFile).subscribe(
        () => {
          setTimeout(() => this.notificationService.showSuccess("Producto añadido con éxito"), 200);
          this.router.navigate(['/admin-dashboard/table']);
        },
        error => {
          setTimeout(() => this.notificationService.showWarning("Error al añadir el producto"), 200);
        }
      );
    }
  }
}

