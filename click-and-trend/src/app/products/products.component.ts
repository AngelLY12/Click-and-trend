import { Component } from '@angular/core';
import { ProductsItemsComponent } from "../products-items/products-items.component";

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [ProductsItemsComponent],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent {

}
