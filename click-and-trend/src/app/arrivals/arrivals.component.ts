import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-arrivals',
  standalone: true,
  imports: [MatCardModule,MatButtonModule,MatIconModule],
  templateUrl: './arrivals.component.html',
  styleUrl: './arrivals.component.css'
})
export class ArrivalsComponent {
  items = [
    {
      id: 1,
      ruta: 'arrivals/item1.svg',
      title: "Tacones blancos de mujer",
      desc: "Elegantes tacones blancos ideales para eventos formales o para complementar un look sofisticado.",
      precio: 850.00
    },
    {
      id: 2,
      ruta: 'arrivals/item2.svg',
      title: "Poncho blanco",
      desc: "Poncho o rebozo blanco de tejido ligero, perfecto para días frescos y para un look casual.",
      precio: 600.00
    },
    {
      id: 3,
      ruta: 'arrivals/item3.svg',
      title: "Tenis Converse naranjas",
      desc: "Clásicos tenis Converse en color naranja, ideales para darle un toque de color a cualquier outfit casual.",
      precio: 750.00
    },
    {
      id: 4,
      ruta: 'arrivals/item4.svg',
      title: "Gabardina color arena",
      desc: "Gabardina ligera en tono arena, perfecta para un look elegante en días de clima moderado.",
      precio: 1200.00
    },
    {
      id: 5,
      ruta: 'arrivals/item5.svg',
      title: "Anteojos redondos",
      desc: "Anteojos de sol con armazón redondo, un accesorio ideal para darle un toque retro a tu estilo.",
      precio: 300.00
    },
    {
      id: 6,
      ruta: 'arrivals/item6.svg',
      title: "Tenis tipo Air Force blancos",
      desc: "Tenis estilo Air Force Jordan en color blanco, ideales para un look urbano y casual.",
      precio: 950.00
    },
    {
      id: 7,
      ruta: 'arrivals/item7.svg',
      title: "Camisa de manga larga",
      desc: "Camisa de manga larga con tonos cálidos, ideal para días frescos y para un estilo casual y relajado.",
      precio: 650.00
    },
    {
      id: 8,
      ruta: 'arrivals/item8.svg',
      title: "Mochila negra",
      desc: "Mochila compacta en color negro, perfecta para llevar lo esencial en el día a día.",
      precio: 450.00
    },
    {
      id: 9,
      ruta: 'arrivals/item9.svg',
      title: "Conjunto casual de mezclilla",
      desc: "Conjunto de pantalón de mezclilla con playera blanca y otra con rayas rojas, ideal para un estilo juvenil y casual.",
      precio: 1100.00
    }
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
