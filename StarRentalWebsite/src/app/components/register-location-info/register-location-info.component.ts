import { Component } from '@angular/core';
import { AccordionModule } from 'primeng/accordion';
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabelModule } from 'primeng/floatlabel';
import { FormsModule } from '@angular/forms';
import { SelectModule } from 'primeng/select';
import { VehicleServiceService } from '../../services/vehicle-service.service';
import { CommonModule } from '@angular/common';
import { Location } from '../../models/location';
import { LocationService } from '../../services/location.service';
import { Button } from "primeng/button";
import { Vehicle } from '../../models/vehicle';
import { TableModule } from 'primeng/table';

@Component({
  selector: 'app-register-location-info',
  imports: [AccordionModule, InputTextModule, FloatLabelModule, FormsModule, 
    SelectModule, [CommonModule], Button, TableModule
  ],
  templateUrl: './register-location-info.component.html',
  styleUrl: './register-location-info.component.scss',
})
export class RegisterLocationInfoComponent {
  locations: Location[] = []; // Array to store all vehicles
  totalLocations: number = 0; // Total number of cars

  // Properties for adding a new location
  location_id: number | null = null;
  Lname: string = '';
  address_line1: string = '';
  address_line2: string = '';
  city: string = '';
  state: string = '';
  zip_code: number | null = null;
  country: string = '';
  phone_number: string = '';
  email: string = '';
  constructor(
      private VehicleServiceService: VehicleServiceService,
      private LocationService: LocationService
    ) {}
  

  ngOnInit(): void {
    // Fetch all vehicles from the API
    this.LocationService.getLocations().subscribe(
      (locations: Location[]) => {
        this.locations = locations;
        this.totalLocations = locations.length;
        console.log('Fetched Locations:', this.locations); // Debugging
      },
      (error) => {
        console.error('Error fetching locations:', error);
      }
    );
  }
  
  addLocation(): void {
    const newLocation: Location = {
      location_id: 0,
      Lname: this.Lname,
      address_line1: this.address_line1,
      address_line2: this.address_line2,
      city: this.city,
      state: this.state,
      zip_code: this.zip_code!,
      country: this.country,
      phone_number: this.phone_number,
      email: this.email,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }
    this.LocationService.addLocation(newLocation).subscribe(
      (response) => {
        console.log('Location added successfully:', response);
        alert('Location added successfully!');
        // Reset the form fields
        this.location_id
        this.Lname = '';
        this.address_line1 = '';
        this.address_line2 = '';
        this.city = '';
        this.state = '';
        this.zip_code = null;
        this.country = '';
        this.phone_number = '';
      },
      (error) => {
        console.error('Error adding location:', error);
        alert('Failed to add location.');
      }
    );
  };

  deleteLocation(): void {
    if (!this.location_id) {
      alert('Please enter a VIN to delete the car.');
      return;
    }

    this.LocationService.deleteLocationByID(this.location_id).subscribe(
      (response) => {
        console.log('Location deleted successfully:', response);
      },
      (error) => {
        console.error('Error locating location:', error);
        alert('Failed to locate location. Please check the ID and try again.');
      }
    );
  }

}
