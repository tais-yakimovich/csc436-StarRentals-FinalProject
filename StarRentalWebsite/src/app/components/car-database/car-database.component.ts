import { Component, OnInit } from '@angular/core';
import { AccordionModule } from 'primeng/accordion';
import { TableModule } from 'primeng/table';
import { SpeedDialModule } from 'primeng/speeddial';
import { VehicleServiceService } from '../../services/vehicle-service.service';
import { LocationService } from '../../services/location.service';
import { Vehicle } from '../../models/vehicle';
import { Location } from '../../models/location';

@Component({
  selector: 'app-car-database',
  standalone: true,
  imports: [AccordionModule, TableModule, SpeedDialModule],
  templateUrl: './car-database.component.html',
  styleUrls: ['./car-database.component.scss'],
})
export class CarDatabaseComponent implements OnInit {
  vehicles: Vehicle[] = []; // Array to store all vehicles
  totalCars: number = 0; // Total number of cars

  constructor(private vehicleServiceService: VehicleServiceService) {}

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
}