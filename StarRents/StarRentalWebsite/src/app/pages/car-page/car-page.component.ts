import { Component, OnInit} from '@angular/core';
import { CarfilterComponent } from '../../components/carfilter/carfilter.component';
import { CarCardComponent } from '../../components/car-card/car-card.component';
import { ReserveCarComponent } from '../../components/reserve-car/reserve-car.component';
import { Location } from '../../models/location';
import { Vehicle } from '../../models/vehicle';
import { LocationService } from '../../services/location.service';
import { VehicleServiceService } from '../../services/vehicle-service.service';
@Component({
  selector: 'app-car-page',
  imports: [CarfilterComponent, CarCardComponent],
  templateUrl: './car-page.component.html',
  styleUrl: './car-page.component.scss',
})
export class CarPageComponent {
  selectedFilters: any = null; // Holds the filters applied by the user

  // Method to handle the filters emitted by CarfilterComponent
  onFiltersApplied(filters: any): void {
    this.selectedFilters = filters;
    console.log('Filters Applied in CarPageComponent:', this.selectedFilters);
  }
}
