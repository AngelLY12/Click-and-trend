import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-suggestion',
  standalone: true,
  imports: [MatIconModule,MatButtonModule,MatCardModule],
  templateUrl: './suggestion.component.html',
  styleUrl: './suggestion.component.css'
})
export class SuggestionComponent {
  items=[
    {id:1, ruta: "suggestion/item1.svg"},
    {id:2, ruta: "suggestion/item2.svg"},
    {id:3, ruta: "suggestion/item3.svg"},
    {id:4, ruta: "suggestion/item4.svg"}

  ]

}
