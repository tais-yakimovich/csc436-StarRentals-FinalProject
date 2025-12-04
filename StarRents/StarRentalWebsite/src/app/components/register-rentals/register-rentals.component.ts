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
import { Tab } from 'primeng/tabs';
import { RentOuts } from '../../models/rent-outs';
import { RentalService } from '../../services/rental.service';
@Component({
  selector: 'app-register-rentals',
  imports: [AccordionModule, InputTextModule, FloatLabelModule, FormsModule, SelectModule, Button, TableModule],
  templateUrl: './register-rentals.component.html',
  styleUrl: './register-rentals.component.scss',
})
export class RegisterRentalsComponent {
  rental_id: number | null = null;

  constructor(
      private RentalService: RentalService,
    ) {}
  locatedRental: any = null; // Store the located car details

  locateRental(): void {
    if (!this.rental_id) {
      alert('Please enter a VIN to locate the car.');
      return;
    }

    this.RentalService.locateRental(this.rental_id).subscribe(
      (response) => {
        this.locatedRental = response; // Store the located car details
      },
      (error) => {
        console.error('Error locating car:', error);
        alert('Failed to locate car. Please check the VIN and try again.');
      }
    );
  }
  // Delete a car by VIN
  deleteRental(): void {
    if (!this.rental_id) {
      alert('Please enter a VIN to delete the car.');
      return;
    }

    this.RentalService.deleteRental(this.rental_id).subscribe(
      (response) => {
        console.log('Rental deleted successfully:', response);
        alert('Deleted Rental.');
      },
      (error) => {
        console.error('Error locating rental:', error);
        alert('Failed to locate rental. Please check the rental ID and try again.');
      }
    );
  }
}
