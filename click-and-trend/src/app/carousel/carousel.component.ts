import { Component } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { CommonModule } from '@angular/common';  // <-- Importa CommonModule
import {MatIconModule} from '@angular/material/icon';
import { RouterModule} from '@angular/router';

@Component({
  selector: 'app-carousel',
  standalone: true,
  imports: [MatButtonModule,MatCardModule,CommonModule,MatIconModule,RouterModule],
  templateUrl: './carousel.component.html',
  styleUrl: './carousel.component.css'
})
export class CarouselComponent {
  images = [
    'carousel/item1.avif',
    'carousel/item2.avif',
    'carousel/item3.avif',
    'carousel/item4.avif'
  ];
  currentIndex = 0;

  prev() {
    this.currentIndex = (this.currentIndex > 0) ? this.currentIndex - 1 : this.images.length - 1;
  }

  next() {
    this.currentIndex = (this.currentIndex < this.images.length - 1) ? this.currentIndex + 1 : 0;
  }
}
