import { Component } from '@angular/core';
import { Button } from 'primeng/button';
import { Vehicle } from '../../models/vehicle';
import { VehicleServiceService } from '../../services/vehicle-service.service';
import { Location } from '../../models/location';
import { LocationService } from '../../services/location.service';
import { RentalService } from '../../services/rental.service';
import { RentOuts } from '../../models/rent-outs';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { FloatLabel } from 'primeng/floatlabel';
import { UserService } from '../../services/user.service';
import { User } from '../../models/users';
@Component({
  selector: 'app-rental-return-card',
  imports: [ Button, [CommonModule], TableModule, InputTextModule, FormsModule, FloatLabel],
  templateUrl: './rental-return-card.component.html',
  styleUrl: './rental-return-card.component.scss',
})
export class RentalReturnCardComponent {
  locations: Location[] = [];
  locatedRental: RentOuts | null = null; // Store the located car details
  locatedCar: Vehicle | null = null;  
  pickupLocation: Location | null = null; // Store the pickup location details
  dropoffLocation: Location | null = null; // Store the dropoff location details
  rentals: RentOuts[] = []; // Array to store all rentals
  vehicles: { [vin: string]: Vehicle } = {}; // Map to store vehicle details by VIN
  loggedInUser: User | null = null;
return_miles: any;
  
  constructor(
    private vehicleServiceService: VehicleServiceService,
    private locationService: LocationService,
    private rentalService: RentalService,
    private userService: UserService
  ) {}


  // Rental Variables
  rental_id: number | null = null;
  start_mileage: number | null = null;
  return_mileage: number | null = null;
  start_date: string = '2025-01-15';
  return_date: string = '2025-01-15';
  VIN: string = '';
  user_id: number | null = null
  pickup_location_id: number | null = null;
  dropoff_location_id: number | null = null;
  payment_id: number | null = null;


  ngOnInit(): void {
    // Fetch the logged-in user
    this.userService.loggedInUser$.subscribe(
      (user: User | null) => {
        this.loggedInUser = user;
        if (this.loggedInUser && this.loggedInUser.user_id) {
          this.fetchUserRentals(this.loggedInUser.user_id); // Fetch rentals for the user
        } else {
          console.error('No logged-in user found.');
        }
      },
      (error) => {
        console.error('Error fetching logged-in user:', error);
      }
    );
  }

  // Fetch rentals for the logged-in user
  fetchUserRentals(userId: number): void {
    this.rentalService.getUserRentals(userId).subscribe(
      (rentals: RentOuts[]) => {
        this.rentals = rentals; // Store all rentals in the array
        console.log('Fetched Rentals:', this.rentals);

        // Fetch vehicle details for each rental
        this.rentals.forEach((rental) => {
          if (rental.VIN && !this.vehicles[rental.VIN]) {
            this.fetchVehicleDetails(rental.VIN);
          }
        });
      },
      (error) => {
        console.error('Error fetching rentals:', error);
      }
    );
  }

  // Fetch vehicle details by VIN
  fetchVehicleDetails(vin: string): void {
    this.vehicleServiceService.locateCar(vin).subscribe(
      (vehicle: Vehicle) => {
        this.vehicles[vin] = vehicle; // Store vehicle details in the map
        console.log(`Vehicle details for VIN ${vin}:`, vehicle);
      },
      (error) => {
        console.error(`Error fetching vehicle details for VIN ${vin}:`, error);
      }
    );
  }
  // Handle car return
  // Handle car return
returnCar(rental: RentOuts): void {
  if (!this.return_miles || this.return_miles <= rental.start_mileage) {
    alert('Please enter a valid return mileage greater than the starting mileage.');
    return;
  }

  // Update the rental with the return mileage
  const updatedRental: RentOuts = {
    ...rental,
    return_mileage: this.return_miles, // Use return_miles to set the new mileage
  };

  this.rentalService.updateRental(updatedRental).subscribe(
    (response) => {
      console.log('Rental updated successfully:', response);
      alert('Car successfully dropped off!');
      this.updateCar(rental); // Update the vehicle mileage after rental is updated
    },
    (error) => {
      console.error('Error updating rental:', error);
      alert('Failed to complete the drop-off. Please try again.');
    }
  );
}

  updateCar(rental: RentOuts): void {
  const vehicle = this.vehicles[rental.VIN];
  if (!vehicle) {
    console.error('Vehicle details not found for VIN:', rental.VIN);
    return;
  }

  const updatedVehicle: Vehicle = {
    ...vehicle,
    miles: this.return_miles, // Use return_miles to set the new mileage
    location_id: rental.dropoff_location_id, // Update the location to the drop-off location
  };

  this.vehicleServiceService.updateVehicle(updatedVehicle).subscribe(
    (response) => {
      console.log('Vehicle updated successfully:', response);
    },
    (error) => {
      console.error('Error updating vehicle:', error);
      alert('Failed to update vehicle mileage. Please try again.');
    }
  );
}

}
