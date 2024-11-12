import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-women-sugg',
  standalone: true,
  imports: [MatButtonModule,MatCardModule,MatIconModule],
  templateUrl: './women-sugg.component.html',
  styleUrl: './women-sugg.component.css'
})
export class WomenSuggComponent {
  items=[
    {
      id: 1,
      ruta: 'women/item1.svg',
      title: "Blusa floral de verano",
      desc: "Blusa fresca y ligera con estampado floral, ideal para los días de verano.",
      precio: 399.00
    },
    {
      id: 2,
      ruta: 'women/item2.svg',
      title: "Pantalones de mezclilla",
      desc: "Pantalones de mezclilla ajustados y cómodos, perfectos para un look casual y moderno.",
      precio: 749.00
    },
    {
      id: 3,
      ruta: 'women/item3.svg',
      title: "Suéter de lana suave",
      desc: "Suéter cálido y acogedor de lana, ideal para los días fríos.",
      precio: 599.00
    },
    {
      id: 4,
      ruta: 'women/item4.svg',
      title: "Zapatos de tacón",
      desc: "Zapatos elegantes de tacón alto, perfectos para eventos y ocasiones especiales.",
      precio: 999.00
    },

    {
      id: 5,
      ruta: 'women/item5.svg',
      title: "Zuecos de plataforma",
      desc: "Zuecos con plataforma en tonos tierra, perfectos para un look casual y cómodo con un toque vintage.",
      precio: 549.00
    },
    {
      id: 6,
      ruta: 'women/item6.svg',
      title: "Tenis casuales",
      desc: "Cómodos tenis casuales de color claro, perfectos para el día a día o para combinar con looks relajados.",
      precio: 399.00
    },

    {
      id: 7,
      ruta: 'women/item7.svg',
      title: "Esferas decorativas",
      desc: "Conjunto de esferas modernas, perfectas para decorar tu casa y dar un toque de estilo.",
      precio: 149.00
    },
    {
      id: 8,
      ruta: 'women/item8.svg',
      title: "Accesorios decorativos dorados",
      desc: "Decoración dorada con detalles geométricos, ideal para complementar un espacio con un toque elegante y moderno.",
      precio: 299.00
    },
    {
      id: 9,
      ruta: 'women/item9.svg',
      title: "Pulsera dorada",
      desc: "Pulsera dorada con diseño minimalista, perfecta para darle un toque elegante a cualquier look.",
      precio: 199.00
    }
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
