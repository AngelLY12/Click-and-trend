import { Component } from '@angular/core';
import { ProductItemsService } from '../services/product-items.service';

@Component({
  selector: 'app-items-shopping-cart',
  standalone: true,
  imports: [],
  templateUrl: './items-shopping-cart.component.html',
  styleUrl: './items-shopping-cart.component.css'
})
export class ItemsShoppingCartComponent {
  items: any[] = [];
  mujeres: any[] = [];
  ninos: any[] = [];
  allProducts: any[]=[];
  constructor(private productItemsService: ProductItemsService) {}

  ngOnInit(): void {
    // Escuchar el valor seleccionado

  }
  increaseQuantity(item:any) {
    if (item) {
      item.quantity++;
    }
  }

  decreaseQuantity(item:any) {
    if (item && item.quantity > 1) {
      item.quantity--;
    }
  }

}
