import { Component, OnInit} from '@angular/core';
import { AccordionModule } from 'primeng/accordion';
import { SliderModule } from 'primeng/slider';
import { FormsModule } from '@angular/forms';
import { CheckboxModule } from 'primeng/checkbox';
import { CommonModule } from '@angular/common';
import { Vehicle } from '../../models/vehicle';
import { VehicleFilters, VehicleServiceService } from '../../services/vehicle-service.service';
@Component({
  selector: 'app-carfilter',
  imports: [AccordionModule, SliderModule, FormsModule, CheckboxModule, [CommonModule]],
  templateUrl: './carfilter.component.html',
  styleUrl: './carfilter.component.scss',
})
export class CarfilterComponent implements OnInit{
  value: any;
  size: any;
  constructor(private vehicleService: VehicleServiceService) {}
  filters: VehicleFilters | null = null;
  body_style: VehicleFilters["body_style"] = [];
  locations: VehicleFilters["location_id"] = [];
  fuel_type: VehicleFilters["fuel_type"] = [];

  selectedBody_styles: string[] = [];   // <-- for multiple checkboxes

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
  }
  locations = [
    { label: "Kingston", value: "kingston" },
    { label: "Providence", value: "providence" },
    { label: "Narragansett", value: "narragansett" },
    { label: "Warwick", value: "warwick" }
  ];
  selectedLocation: string[] = [];   // <-- for multiple checkboxes

  transmissionTypes = [
    { label: "Gasoline", value: "gasoline" },
    { label: "Electric", value: "electric" }
  ];
  selectedTransmission: string[] = [];   // <-- for multiple checkboxes


}
