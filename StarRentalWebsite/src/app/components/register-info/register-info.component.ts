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
@Component({
  selector: 'app-register-info',
  imports: [AccordionModule, InputTextModule, FloatLabelModule, FormsModule, SelectModule, [CommonModule], Button],
  templateUrl: './register-info.component.html',
  styleUrl: './register-info.component.scss',
})
export class RegisterInfoComponent {

  car_status_list = [
    { label: 'Available', value: 'available' },
    { label: 'Unavailable', value: 'unavailable' },
    { label: 'Under Maintenance', value: 'under_maintenance' }
  ];
  vin: string = '';
  license_plate: string = '';
  year: number | null = null;
  make: string = '';
  model: string = '';
  body_style: string = '';
  color: string = '';
  miles: number | null = null;
  rental_price: number | null = null;
  location_id: number | null = null;
  fuel_type: string = '';
  rental_status: any = '';
  photo_url: string = '';

  locatedCar: any = null; // Store the located car details

  // Properties for adding a new location
  locationName: string = '';
  addressLine1: string = '';
  addressLine2: string = '';
  city: string = '';
  state: string = '';
  zipCode: number | null = null;
  country: string = '';
  phoneNumber: string = '';
  constructor(
      private VehicleServiceService: VehicleServiceService,
      private LocationService: LocationService
    ) {}

  addCar(): void {
    const newCar: Vehicle = {
      VIN: this.vin,
      license_plate: this.license_plate,
      year: this.year!,
      make: this.make,
      model: this.model,
      body_style: this.body_style,
      color: this.color,
      miles: this.miles!,
      rental_price: this.rental_price!,
      location_id: this.location_id!,
      fuel_type: this.fuel_type,
      rental_status: this.rental_status,
      photo_url: this.photo_url,
      location: undefined
    };

    this.VehicleServiceService.addCar(newCar).subscribe(
      (response) => {
        console.log('Car added successfully:', response);
        alert('Car added successfully!');
      },
      (error) => {
        console.error('Error adding car:', error);
        alert('Failed to add car. Please try again.');
      }
    );
  }

  // Delete a car by VIN
  deleteCar(): void {
    if (!this.vin) {
      alert('Please enter a VIN to delete the car.');
      return;
    }

    this.VehicleServiceService.deleteCar(this.vin).subscribe(
      (response) => {
        console.log('Car deleted successfully:', response);
      },
      (error) => {
        console.error('Error locating car:', error);
        alert('Failed to locate car. Please check the VIN and try again.');
      }
    );
  }

  locateCar(): void {
    if (!this.vin) {
      alert('Please enter a VIN to locate the car.');
      return;
    }

    this.VehicleServiceService.locateCar(this.vin).subscribe(
      (response) => {
        this.locatedCar = response; // Store the located car details
      },
      (error) => {
        console.error('Error locating car:', error);
        alert('Failed to locate car. Please check the VIN and try again.');
      }
    );
  }

}
