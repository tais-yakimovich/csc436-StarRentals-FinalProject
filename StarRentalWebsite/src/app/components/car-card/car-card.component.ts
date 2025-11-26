import { Component } from '@angular/core';
import { Button, ButtonModule } from 'primeng/button';
import { DataViewModule } from 'primeng/dataview';
@Component({
  selector: 'app-car-card',
  imports: [ ButtonModule, DataViewModule ],
  templateUrl: './car-card.component.html',
  styleUrl: './car-card.component.scss',
})
export class CarCardComponent {
  items = [
    { id: 1, name: 'Item A' },
    { id: 2, name: 'Item B' },
    { id: 3, name: 'Item C' },
    { id: 4, name: 'Item D' }
  ];
}
