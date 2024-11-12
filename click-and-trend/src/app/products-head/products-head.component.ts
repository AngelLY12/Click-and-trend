import { Component,Input, OnInit } from '@angular/core';
import { CategoryService } from '../services/category.service';

@Component({
  selector: 'app-products-head',
  standalone: true,
  imports: [],
  templateUrl: './products-head.component.html',
  styleUrl: './products-head.component.css'
})
export class ProductsHeadComponent implements OnInit {
  selectedItem: string = '';

  constructor(private category: CategoryService) {}

  ngOnInit(): void {
    // Escuchar el valor seleccionado
    this.category.selectedItem$.subscribe(item => {
      this.selectedItem = item;
    });
  }
}
