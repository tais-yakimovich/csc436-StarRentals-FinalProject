import { Component, EventEmitter, OnInit, Input, SimpleChanges} from '@angular/core';
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
import { FilterService } from '../../services/filter.service';

@Component({
  selector: 'app-car-card',
  imports: [ButtonModule, DataViewModule, [CommonModule], DialogModule, ReserveCarComponent, DateRangeComponent],
  templateUrl: './car-card.component.html',
  styleUrl: './car-card.component.scss',
})
export class CarCardComponent implements OnInit{
  @Input() filters: any;
  vehicles: Vehicle[] = []; // Array to store vehicle data
  selectedPickUpLocationId: number | null = null; // Variable to store pick-up location ID
  selectedDropOffLocationId: number | null = null; // Variable to store drop-off location ID
  selectedCar: any = null; // Stores the selected car data
  @Input() dates: Date[] = []; // The selected drop-off location
  selectedFilters: any = null;

  isReserveDialogVisible: boolean = false;
  locations: Location[] = [];

  constructor(
    private vehicleServiceService: VehicleServiceService,
    private locationService: LocationService,
    private filterService: FilterService
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
 
  fetchVehiclesForPickUpLocation(dates: Date[]): void {
    if (!dates || dates.length < 2) {
      console.error('Invalid dates provided:', dates);
      return;
    }

    if (this.selectedPickUpLocationId !== null) {
      // Parse the dates into the desired format (YYYY-MM-DD)
      const startDate = dates[0] instanceof Date ? dates[0].toISOString().slice(0, 10) : null;
      const returnDate = dates[1] instanceof Date ? dates[1].toISOString().slice(0, 10) : null;
      const bodyStyles = this.filterService.getBodyStyles();
      const priceMax = this.filterService.getPriceMax();
      const fuelTypes = this.filterService.getFuelTypes();
      const locations = this.filterService.getLocations();

      if (!startDate || !returnDate) {
        console.error('Invalid start or return date:', { startDate, returnDate });
        return;
      }
      if (locations && locations.length > 0) {
        this.vehicleServiceService.getAvailableCars(locations, startDate, returnDate, bodyStyles, priceMax, fuelTypes).subscribe(
        (vehicles: Vehicle[]) => {
          this.vehicles = vehicles.map((vehicle) => {
            const location = this.locations.find(
              (loc) => loc.location_id === vehicle.location_id
            );
            return { ...vehicle, location }; // Add location data to the vehicle
          });
          console.log('Vehicles fetched for pick-up location:', this.vehicles);
        },
        (error) => {
          console.error('Error fetching vehicles:', error);
        }
      );
      }
      else{
      this.vehicleServiceService.getAvailableCars([this.selectedPickUpLocationId], startDate, returnDate, bodyStyles, priceMax, fuelTypes).subscribe(
        (vehicles: Vehicle[]) => {
          this.vehicles = vehicles.map((vehicle) => {
            const location = this.locations.find(
              (loc) => loc.location_id === vehicle.location_id
            );
            return { ...vehicle, location }; // Add location data to the vehicle
          });
          console.log('Vehicles fetched for pick-up location:', this.vehicles);
        },
        (error) => {
          console.error('Error fetching vehicles:', error);
        }
      );
      }
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

    if (dates.length > 0) {
      this.dates = dates;
      console.log('Selected Date Range:', dates);

      // Perform actions based on the selected date range
    }
    if (pickUp) {
      this.selectedPickUpLocationId = pickUp;
      this.fetchVehiclesForPickUpLocation(dates);
    }

    if (dropOff) {
      this.selectedDropOffLocationId = dropOff;
      console.log('Drop-Off Location ID:', this.selectedDropOffLocationId);
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