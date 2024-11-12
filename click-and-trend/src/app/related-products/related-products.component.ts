import { Component } from '@angular/core';
import { ProductItemsService } from '../services/product-items.service';

@Component({
  selector: 'app-related-products',
  standalone: true,
  imports: [],
  templateUrl: './related-products.component.html',
  styleUrl: './related-products.component.css'
})
export class RelatedProductsComponent {
  relatedProducts: any[] = [];

  constructor(private productService: ProductItemsService) {}

  ngOnInit(): void {
  }
}
