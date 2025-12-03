import { Component, OnInit} from '@angular/core';
import { Button, ButtonModule } from 'primeng/button';
import { DataViewModule } from 'primeng/dataview';
import { CommonModule } from '@angular/common';
import { Vehicle } from '../../models/vehicle';
import { VehicleServiceService } from '../../services/vehicle-service.service';
import { DialogModule } from 'primeng/dialog';
import { ReserveCarComponent } from '../reserve-car/reserve-car.component';
import { DateRangeComponent } from '../date-range/date-range.component';
import { LocationService } from '../../services/location.service';
import { Location } from '../../models/location';
@Component({
  selector: 'app-car-card',
  imports: [ButtonModule, DataViewModule, [CommonModule], DialogModule, ReserveCarComponent, DateRangeComponent],
  templateUrl: './car-card.component.html',
  styleUrl: './car-card.component.scss',
})
export class CarCardComponent implements OnInit{
  vehicles: Vehicle[] = []; // Array to store vehicle data
  selectedPickUpLocationId: number | null = null; // Variable to store pick-up location ID
  selectedDropOffLocationId: number | null = null; // Variable to store drop-off location ID
  selectedCar: any = null; // Stores the selected car data
  isReserveDialogVisible: boolean = false;
  locations: Location[] = [];

  constructor(
    private vehicleServiceService: VehicleServiceService,
    private locationService: LocationService
  ) {}

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
  // Handle pick-up location selection
  onPickUpLocationSelected(locationId: number): void {
    this.selectedPickUpLocationId = locationId;
    console.log('Selected Pick-Up Location ID:', this.selectedPickUpLocationId);
    alert("Value")
    // Fetch vehicles for the selected pick-up location
    this.fetchVehiclesForPickUpLocation();
  }

  // Fetch vehicles for the selected pick-up location
  fetchVehiclesForPickUpLocation(): void {
    if (this.selectedPickUpLocationId !== null) {
      this.vehicleServiceService.getVehiclesAtLocation(this.selectedPickUpLocationId).subscribe(
        (vehicles: Vehicle[]) => {
          this.vehicles = vehicles;
          console.log('Vehicles fetched for pick-up location:', this.vehicles);
        },
        (error) => {
          console.error('Error fetching vehicles:', error);
          alert('Failed to fetch vehicles. Please try again later.');
        }
      );
    }
  }

  // Handle drop-off location selection
  onDropOffLocationSelected(locationId: number): void {
    this.selectedDropOffLocationId = locationId;
    console.log('Selected Drop-Off Location ID:', this.selectedDropOffLocationId);
  }

  // Handle search event
  onSearch(event: { pickUp: number | null; dropOff: number | null; dates: Date[] }): void {
    console.log('Search Data:', event);

    const { pickUp, dropOff, dates } = event;

    if (pickUp) {
      this.selectedPickUpLocationId = pickUp;
      this.fetchVehiclesForPickUpLocation();
    }

    if (dropOff) {
      this.selectedDropOffLocationId = dropOff;
      console.log('Drop-Off Location ID:', this.selectedDropOffLocationId);
    }

    if (dates.length > 0) {
      console.log('Selected Date Range:', dates);
      // Perform actions based on the selected date range
    }
  }

  // Open the reserve dialog and pass the car data
  openReserveDialog(car: any): void {
    this.selectedCar = car; // Set the selected car data
    this.isReserveDialogVisible = true; // Show the reserve dialog
  }

  // Close the reserve dialog
  closeReserveDialog(): void {
    this.isReserveDialogVisible = false; // Hide the reserve dialog
  }

  trackByVIN(index: number, vehicle: Vehicle): string {
    return vehicle.VIN; // Use VIN as a unique identifier
  }
  
}