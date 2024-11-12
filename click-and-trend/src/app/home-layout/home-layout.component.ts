import { Component } from '@angular/core';
import { CarouselComponent } from '../carousel/carousel.component';
import { ArrivalsComponent } from "../arrivals/arrivals.component";
import { SuggestionComponent } from "../suggestion/suggestion.component";
import { MenSuggComponent } from "../men-sugg/men-sugg.component";
import { WomenSuggComponent } from "../women-sugg/women-sugg.component";
import { KidsSuggComponent } from "../kids-sugg/kids-sugg.component";

@Component({
  selector: 'app-home-layout',
  standalone: true,
  imports: [CarouselComponent, ArrivalsComponent, SuggestionComponent, MenSuggComponent, WomenSuggComponent, KidsSuggComponent],
  templateUrl: './home-layout.component.html',
  styleUrl: './home-layout.component.css'
})
export class HomeLayoutComponent {

}
