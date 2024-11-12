import { Component, OnInit } from '@angular/core';
import { PanelComponent } from '../panel/panel.component';
import { TableComponent } from '../table/table.component';
import { RouterOutlet } from '@angular/router';
@Component({
  selector: 'app-dashboard-layout',
  standalone: true,
  imports: [PanelComponent,TableComponent,RouterOutlet],
  templateUrl: './dashboard-layout.component.html',
  styleUrl: './dashboard-layout.component.css'
})
export class DashboardLayoutComponent{

}
