import { Component,Input } from '@angular/core';
import { CategoryService } from '../services/category.service';

@Component({
  selector: 'app-products-filter',
  standalone: true,
  imports: [],
  templateUrl: './products-filter.component.html',
  styleUrl: './products-filter.component.css'
})
export class ProductsFilterComponent {
  selectedItem: string = '';

  constructor(private category: CategoryService) {}

  ngOnInit(): void {
    // Escuchar el valor seleccionado
    this.category.selectedItem$.subscribe(item => {
      this.selectedItem = item;
    });
  }
}
