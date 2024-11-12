import { Product } from './../../shared/components/interfaces/product';
import { Component, OnInit } from '@angular/core';
import { ProductItemsService } from '../../services/product-items.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FileUploadModule,FileSelectEvent } from 'primeng/fileupload';
import { NotificationService } from '../../services/notification.service';
import { image } from '@cloudinary/url-gen/qualifiers/source';

@Component({
  selector: 'app-edit-product',
  standalone: true,
  imports: [FormsModule, CommonModule,FileUploadModule],
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css'],
})
export class EditProductComponent implements OnInit {
  id!:number;
  product: Product = {category: '',
    subCategory: '',};
  selectedFile: File | null = null;
  formatSubCategory(subCategory: string): string {
    return subCategory.replace(/_/g, ' ');
  }
  subCategories: { [key: string]: string[] } = {
    ROPA: ['ROPA_CASUAL', 'ROPA_DEPORTIVA', 'ROPA_DE PLAYA', 'ABRIGOS_Y_CHAQUETAS', 'ROPA_DE_PUNTO', 'ROPA_FORMAL_DE_INVIERNO'],
    CALZADO: ['SANDALIAS', 'ZAPATILLAS_DEPORTIVAS_LIGERAS', 'MOCASINES', 'BOTAS_DE_CUERO', 'BOTINES', 'ZAPATOS_IMPERMEABLES', 'BOTAS_LARGAS', 'BOTINES_DE_TACÓN', 'BOTAS_IMPERMEABLES', 'SANDALIAS_DE_TACÓN', 'SANDALIAS_PLANAS', 'CALZADO_DE_AGUA', 'BOTAS_DE_LLUVIA', 'BOTINES_FORRADOS'],
    ACCESORIOS: ['RELOJES', 'BRAZALETES', 'PULSERAS', 'ANILLOS']
  };
  filteredSubCategories: string[] = [];

  // Método para actualizar subcategorías basadas en la categoría seleccionada
  onCategoryChange() {
    if(!this.product.category){
      setTimeout(() => this.notificationService.showWarning("Selecciona primero una categoria"), 500);

    }else{
      this.filteredSubCategories = this.subCategories[this.product.category] || [];
      this.product.subCategory = ''; // Reinicia la subcategoría seleccionada
    }

  }
  constructor(
    private productService: ProductItemsService,
    private route: ActivatedRoute,
    private router: Router,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.id = +this.route.snapshot.paramMap.get('id')!;
    this.loadProductData();

  }
  onFileSelected(event:FileSelectEvent): void {
    this.selectedFile = event.files[0];
    console.log('File selected:', this.selectedFile);

  }

  loadProductData() {
    this.productService.getProductById(this.id).subscribe(
      (data) => {
        console.log("Data received:", data);
        this.product= data;
        this.onCategoryChange();
        console.log("Producto actualizado en el formulario:", this.product);
      },
      error => {
        console.error('Error fetching product data:', error);
      }
    );
  }


  updateProduct() {
    // Llama al servicio de actualización con o sin imagen
    this.productService.updateProduct(this.id, this.product, this.selectedFile || undefined).subscribe(
      response => {
        setTimeout(() => this.notificationService.showSuccess('Producto actualizado con éxito.'), 500);
        this.router.navigate(['/admin-dashboard/table']);
      },
      error => {
        setTimeout(() => this.notificationService.showError('Error actualizando el producto.'), 500);
        console.error('Error updating product:', error);
      }
    );
  }

}
