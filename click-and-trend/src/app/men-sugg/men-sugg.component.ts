import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-men-sugg',
  standalone: true,
  imports: [MatIconModule, MatCardModule,MatButtonModule],
  templateUrl: './men-sugg.component.html',
  styleUrl: './men-sugg.component.css'
})
export class MenSuggComponent {
  items=[
    { id: 1, ruta: 'men/item1.svg', title: "Camisa de manga larga", desc: "Ligera y versátil, esta camiseta de manga larga es una prenda esencial para el armario masculino. Disponible en varios colores.", precio: 399.00 },
  { id: 2, ruta: 'men/item2.svg', title: "Chaqueta de Cuero", desc: "Esta chaqueta de cuero estilo motociclista aporta un toque atrevido y moderno a cualquier look. Ideal para un estilo casual.", precio: 1599.00 },
  { id: 3, ruta: 'men/item3.svg', title: "Suéter Casual", desc: "Perfecto para climas frescos, este suéter combina estilo y comodidad con su diseño minimalista en tonos oscuros.", precio: 699.00 },
  { id: 4, ruta: 'men/item4.svg', title: "Tenis Casuales", desc: "Un básico urbano, ideales para combinar con diferentes estilos. Cómodos y versátiles.", precio: 850.00 },
  { id: 5, ruta: 'men/item5.svg', title: "Botas de Cuero Rojas", desc: "Elegantes y robustas, estas botas combinan estilo y funcionalidad para cualquier ocasión.", precio: 1200.00 },
  { id: 6, ruta: 'men/item6.svg', title: "Zapatos Formales", desc: "Sofisticados y elegantes, perfectos para eventos formales o para el trabajo.", precio: 950.00 },
  { id: 7, ruta: 'men/item7.svg', title: "Reloj Deportivo", desc: "Reloj resistente y moderno, perfecto para actividades al aire libre.", precio: 1350.00 },
  { id: 8, ruta: 'men/item8.svg', title: "Set de Accesorios para Hombre", desc: "Incluye correa, cartera y llavero en un elegante tono negro, ideal para regalar.", precio: 1500.00 },
  { id: 9, ruta: 'men/item9.svg', title: "Pantalones Cortos de Camuflaje", desc: "Cómodos y casuales, perfectos para el verano o actividades al aire libre.", precio: 450.00 }
  ]
  currentIndex = 0;
  itemsPerPage = 3;

prev() {
  this.currentIndex = (this.currentIndex - this.itemsPerPage >= 0)
    ? this.currentIndex - this.itemsPerPage
    : Math.max(this.items.length - (this.items.length % this.itemsPerPage || this.itemsPerPage), 0);
}

next() {
  this.currentIndex = (this.currentIndex + this.itemsPerPage < this.items.length)
    ? this.currentIndex + this.itemsPerPage
    : 0;
}

get visibleItems() {
  return this.items.slice(this.currentIndex, this.currentIndex + this.itemsPerPage);
}

}
