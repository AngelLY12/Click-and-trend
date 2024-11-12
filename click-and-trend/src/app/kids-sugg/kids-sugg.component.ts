import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-kids-sugg',
  standalone: true,
  imports: [MatIconModule, MatCardModule,MatButtonModule],
  templateUrl: './kids-sugg.component.html',
  styleUrl: './kids-sugg.component.css'
})
export class KidsSuggComponent {
  items = [
    {
      id: 1,
      ruta: 'kids/item1.svg',
      title: "Suéter infantil de lana",
      desc: "Suéter cálido de lana perfecto para mantener a los pequeños abrigados en los días fríos.",
      precio: 249.00
    },
    {
      id: 2,
      ruta: 'kids/item2.svg',
      title: "Conjunto de pijama",
      desc: "Conjunto de pijama cómodo y suave, ideal para el descanso de los niños.",
      precio: 299.00
    },
    {
      id: 3,
      ruta: 'kids/item3.svg',
      title: "Camisa de manga corta hawaiana",
      desc: "Camisa ligera e ideal para tus vacaciones.",
      precio: 199.00
    },
    {
      id: 4,
      ruta: 'kids/item4.svg',
      title: "Tenis altos",
      desc: "Par de tenis negros, ideales para ocasiones casuales y super cómodos.",
      precio: 349.00
    },
    {
      id: 5,
      ruta: 'kids/item5.svg',
      title: "Botas impermeables",
      desc: "Botas resistentes al agua, ideales para los días de lluvia y aventuras en la naturaleza.",
      precio: 449.00
    },
    {
      id: 6,
      ruta: 'kids/item6.svg',
      title: "Calcetines de colores",
      desc: "Pack de calcetines en colores vibrantes y diseños alegres para los pequeños.",
      precio: 149.00
    },

  ];

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
