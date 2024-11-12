import { Component, OnInit } from '@angular/core';
import { ProductsFilterComponent } from '../../products-filter/products-filter.component';
import { ProductsHeadComponent } from '../../products-head/products-head.component';
import { ProductsComponent } from '../../products/products.component';

@Component({
  selector: 'app-men-layout',
  standalone: true,
  imports: [ProductsFilterComponent,ProductsHeadComponent,ProductsComponent],
  templateUrl: './men-layout.component.html',
  styleUrl: './men-layout.component.css'
})
export class MenLayoutComponent {

}
