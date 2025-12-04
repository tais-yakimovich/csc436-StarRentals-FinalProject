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
import { Button } from 'primeng/button';
import { FilterService } from '../../services/filter.service';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-carfilter',
  imports: [AccordionModule, SliderModule, FormsModule, CheckboxModule, [CommonModule], Button, InputTextModule],
  templateUrl: './carfilter.component.html',
  styleUrl: './carfilter.component.scss',
})
export class CarfilterComponent implements OnInit{
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
  selectedLocation: number[] = [];   // <-- for multiple checkboxes
  selectedFuelTypes: string[] = [];   // <-- for multiple checkboxes
  priceMax: number | null = null;
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
  // Save the selected filters to the shared service
  onApplyFilters(): void {
    this.filterService.setBodyStyles(this.selectedBodyStyles);
    this.filterService.setFuelTypes(this.selectedFuelTypes);
    this.filterService.setLocations(this.selectedLocation);
    this.filterService.setPriceMax(this.priceMax);

    console.log('Filters saved to service:', {
      bodyStyles: this.selectedBodyStyles,
      fuelTypes: this.selectedFuelTypes,
      locations: this.selectedLocation,
      priceMax: this.priceMax,

      
    });
  }
  
 
}
