import { Component } from '@angular/core';
import { Button, ButtonModule } from 'primeng/button';
import { DataViewModule } from 'primeng/dataview';
import { CommonModule } from '@angular/common';
import { Vehicle } from '../../models/vehicle';
import { VehicleServiceService } from '../../services/vehicle-service.service';
import { Location } from '../../models/location';
import { LocationService } from '../../services/location.service';
import { DialogModule } from 'primeng/dialog';
@Component({
  selector: 'app-car-card',
  imports: [ ButtonModule, DataViewModule, [CommonModule], DialogModule],
  templateUrl: './car-card.component.html',
  styleUrl: './car-card.component.scss',
})
export class CarCardComponent {
  vehicles: Vehicle[] = []; // Array to store vehicle data
  locations: Location[] = [];
  constructor(
    private vehicleServiceService: VehicleServiceService,
    private locationService: LocationService
  ) {}


  trackByVIN(index: number, vehicle: Vehicle): string {
    return vehicle.VIN; // Use VIN as a unique identifier
  }

  ngOnInit(): void {
    // Fetch vehicles
    this.vehicleServiceService.getVehicles().subscribe(
      (vehicles: Vehicle[]) => {
        this.vehicles = vehicles;

        // Fetch locations
        this.locationService.getLocations().subscribe(
          (locations: Location[]) => {
            this.locations = locations;

            // Map location data to vehicles
            this.vehicles = this.vehicles.map((vehicle) => {
              const location = this.locations.find(
                (loc) => loc.location_id === vehicle.location_id
              );
              return { ...vehicle, location }; // Add location data to the vehicle
            });
          },
          (error) => {
            console.error('Error fetching locations:', error);
          }
        );
      },
      (error) => {
        console.error('Error fetching vehicles:', error);
      }
    );
  }
}
