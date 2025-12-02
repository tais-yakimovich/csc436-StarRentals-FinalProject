import { Component } from '@angular/core';
import { CarfilterComponent } from '../../components/carfilter/carfilter.component';
import { CarCardComponent } from '../../components/car-card/car-card.component';
import { DateRangeComponent } from '../../components/date-range/date-range.component';
import { ReserveCarComponent } from '../../components/reserve-car/reserve-car.component';
@Component({
  selector: 'app-car-page',
  imports: [CarfilterComponent, CarCardComponent, DateRangeComponent],
  templateUrl: './car-page.component.html',
  styleUrl: './car-page.component.scss',
})
export class CarPageComponent {

}
