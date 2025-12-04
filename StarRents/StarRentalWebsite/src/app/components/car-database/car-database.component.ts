import { Component, OnInit } from '@angular/core';
import { AccordionModule } from 'primeng/accordion';
import { TableModule } from 'primeng/table';
import { SpeedDialModule } from 'primeng/speeddial';
import { VehicleServiceService } from '../../services/vehicle-service.service';
import { LocationService } from '../../services/location.service';
import { Vehicle } from '../../models/vehicle';
import { Location } from '../../models/location';
import { Button } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabelModule } from 'primeng/floatlabel';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-car-database',
  standalone: true,
  imports: [AccordionModule, TableModule, SpeedDialModule, Button, DialogModule, FormsModule, FloatLabelModule,InputTextModule],
  templateUrl: './car-database.component.html',
  styleUrls: ['./car-database.component.scss'],
})
export class CarDatabaseComponent implements OnInit {
  vehicles: Vehicle[] = []; // Array to store all vehicles
  totalCars: number = 0; // Total number of cars
  visible: boolean = false;
  constructor(private vehicleServiceService: VehicleServiceService) {}

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

  ngOnInit(): void {
    // Fetch all vehicles from the API
    this.vehicleServiceService.getVehicles().subscribe(
      (vehicles: Vehicle[]) => {
        this.vehicles = vehicles;
        this.totalCars = vehicles.length;
        console.log('Fetched Vehicles:', this.vehicles); // Debugging
      },
      (error) => {
        console.error('Error fetching vehicles:', error);
      }
    );
  }

  // Show the dialog and populate the form with the selected car's data
  showDialog(car: Vehicle): void {
    this.vin = car.VIN;
    this.license_plate = car.license_plate;
    this.year = car.year;
    this.make = car.make;
    this.model = car.model;
    this.body_style = car.body_style;
    this.color = car.color;
    this.miles = car.miles;
    this.rental_price = car.rental_price;
    this.location_id = car.location_id;
    this.fuel_type = car.fuel_type;
    this.rental_status = car.rental_status;
    this.photo_url = car.photo_url;

    this.visible = true; // Show the dialog
  }
  // Method to hide the dialog (optional, can also use inline binding)
  hideDialog(): void {
    this.visible = false;
  }

  updateCar(): void {
    const updateCar: Vehicle = {
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

    this.vehicleServiceService.updateVehicle(updateCar).subscribe(
      (response) => {
        console.log('Car added successfully:', response);
        alert('Car updated successfully!');
      },
      (error) => {
        console.error('Error adding car:', error);
        alert('Failed to add car. Please try again.');
      }
    );
  }
}