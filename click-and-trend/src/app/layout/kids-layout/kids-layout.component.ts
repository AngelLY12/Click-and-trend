import { Component } from '@angular/core';
import { ProductsFilterComponent } from '../../products-filter/products-filter.component';
import { ProductsHeadComponent } from '../../products-head/products-head.component';
import { ProductsComponent } from '../../products/products.component';

@Component({
  selector: 'app-kids-layout',
  standalone: true,
  imports: [ProductsFilterComponent, ProductsHeadComponent, ProductsComponent],
  templateUrl: './kids-layout.component.html',
  styleUrl: './kids-layout.component.css'
})
export class KidsLayoutComponent {

}
