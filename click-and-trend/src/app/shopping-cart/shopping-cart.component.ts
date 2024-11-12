import { Component } from '@angular/core';
import { ProductsItemsComponent } from "../products-items/products-items.component";
import { MenSuggComponent } from "../men-sugg/men-sugg.component";
import { ArrivalsComponent } from "../arrivals/arrivals.component";
import { ItemsShoppingCartComponent } from "../items-shopping-cart/items-shopping-cart.component";
import { RelatedProductsComponent } from "../related-products/related-products.component";

@Component({
  selector: 'app-shopping-cart',
  standalone: true,
  imports: [ProductsItemsComponent, MenSuggComponent, ArrivalsComponent, ItemsShoppingCartComponent, RelatedProductsComponent],
  templateUrl: './shopping-cart.component.html',
  styleUrl: './shopping-cart.component.css'
})
export class ShoppingCartComponent {

}
