import { Component } from '@angular/core';
import { AccordionModule } from 'primeng/accordion';
import { TableModule } from 'primeng/table';


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
  rentals: RentalInfo[] = [
  {
    rental_id: 1,
    start_mileage: 15000,
    return_mileage: 17850,
    start_date: '2025-01-10',
    return_date: '2025-01-15',
    VIN: '1HGCM82633A004352',
    user_id: 23,
    pickup_location_id: 3,
    dropoff_location_id: 5,
    payment_id: 101
  },
  {
    rental_id: 1,
    start_mileage: 15000,
    return_mileage: 17850,
    start_date: '2025-01-10',
    return_date: '2025-01-15',
    VIN: '1HGCM82633A004352',
    user_id: 23,
    pickup_location_id: 3,
    dropoff_location_id: 5,
    payment_id: 101
  }
];

}
