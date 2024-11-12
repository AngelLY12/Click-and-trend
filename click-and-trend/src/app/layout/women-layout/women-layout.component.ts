import { Component, OnInit } from '@angular/core';
import { ProductsFilterComponent } from '../../products-filter/products-filter.component';
import { ProductsHeadComponent } from '../../products-head/products-head.component';
import { ProductsComponent } from '../../products/products.component';

@Component({
  selector: 'app-women-layout',
  standalone: true,
  imports: [ProductsFilterComponent, ProductsHeadComponent, ProductsComponent],
  templateUrl: './women-layout.component.html',
  styleUrl: './women-layout.component.css'
})
export class WomenLayoutComponent {

}
