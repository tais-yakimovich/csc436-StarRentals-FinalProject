import { Component, OnInit, EventEmitter, Output} from '@angular/core';
import { AccordionModule } from 'primeng/accordion';
import { SliderModule } from 'primeng/slider';
import { FormsModule } from '@angular/forms';
import { CheckboxModule } from 'primeng/checkbox';
import { CommonModule } from '@angular/common';
import { Vehicle } from '../../models/vehicle';
import { Location } from '../../models/location';
import { LocationService } from '../../services/location.service';
import { VehicleFilters, VehicleServiceService } from '../../services/vehicle-service.service';
import { FilterService } from '../../services/filter.service';
import { Button } from 'primeng/button';
@Component({
  selector: 'app-carfilter',
  imports: [AccordionModule, SliderModule, FormsModule, CheckboxModule, [CommonModule], Button],
  templateUrl: './carfilter.component.html',
  styleUrl: './carfilter.component.scss',
})
export class CarfilterComponent implements OnInit{
  @Output() applyFilters = new EventEmitter<any>(); // Event emitter for filters

  value: any;
  size: any;
  constructor(
    private vehicleService: VehicleServiceService,
    private filterService: FilterService,
    private locationService: LocationService
  ) {}
  filters: VehicleFilters | null = null;
  body_style: VehicleFilters["body_style"] = [];
  locations: { label: string, value: number }[] = [];
  fuel_type: VehicleFilters["fuel_type"] = [];

  selectedBodyStyles: string[] = [];   // <-- for multiple checkboxes
  selectedLocation: string[] = [];   // <-- for multiple checkboxes
  selectedFuelTypes: string[] = [];   // <-- for multiple checkboxes

  ngOnInit(): void {
    this.vehicleService.getFilters().subscribe(
      (filters: VehicleFilters) => {
        this.filters = filters;
        console.log('Available Filters:', this.filters);
      },
      (error) => {
        console.error('Error fetching filters:', error);
      }
    );
    // Replace labels with IDs for locations from LocationService
    this.locationService.getLocations().subscribe(
      (locations: Location[]) => {
        this.locations = locations.map(loc => ({
          label: loc.Lname,
          value: loc.location_id
        }));
      },
      (error) => {
        console.error('Error fetching locations:', error);
      }
    );

  }
  
  // Emit the selected filters when the "Apply Filter" button is clicked
  onApplyFilters(): void {
    this.applyFilters.emit({
      bodyStyles: this.selectedBodyStyles,
      locations: this.selectedLocation,
      fuelTypes: this.selectedFuelTypes,
    });
  }
}
