import { Component } from '@angular/core';
import { AccordionModule } from 'primeng/accordion';
import { TableModule } from 'primeng/table';
import { RentalService } from '../../services/rental.service';
import { RentOuts } from '../../models/rent-outs';

export interface RentalInfo {
  rental_id: number;
  start_mileage: number;
  return_mileage: number;
  start_date: string;        // ISO date string from API (e.g. "2025-03-01")
  return_date: string;       // same as above
  VIN: string;               // 17-character string
  user_id: number;
  pickup_location_id: number;
  dropoff_location_id: number;
  payment_id: number;
}
@Component({
  selector: 'app-rented-out',
  imports: [TableModule, AccordionModule],
  templateUrl: './rented-out.component.html',
  styleUrl: './rented-out.component.scss',
})
export class RentedOutComponent {
  rentals: RentOuts[] = []; // Array to store all vehicles
  totalRentals: number = 0;

   // Total number of cars
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

  constructor(
      private RentalService: RentalService,
    ) {}

  ngOnInit(): void {
      // Fetch all vehicles from the API
      this.RentalService.getRental().subscribe(
        (rentals: RentOuts[]) => {
          this.rentals = rentals;
          this.totalRentals = rentals.length;
          console.log('Fetched Locations:', this.rentals); // Debugging
        },
        (error) => {
          console.error('Error fetching locations:', error);
        }
    );
  }

}
