import { Component, OnInit } from '@angular/core';
import { AccordionModule } from 'primeng/accordion';
import { TableModule } from 'primeng/table';
import { SpeedDialModule } from 'primeng/speeddial';

interface Car {
  VIN: string;
  license_plate: string;
  year: number;
  make: string;
  model: string;
  body_style: string;
  color: string;
  miles: number;
  rental_price: number;
  location_id: number;
  fuel_type: string;
  rental_status: string;
}

interface Location {
  name: string;
  cars: Car[];
}

@Component({
  selector: 'app-car-database',
  standalone: true,             // <--- MUST ADD
  imports: [AccordionModule, TableModule, SpeedDialModule],
  templateUrl: './car-database.component.html',
  styleUrls: ['./car-database.component.scss']
})
export class CarDatabaseComponent implements OnInit {
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
  cars = [
    { vin: '1HGCM82633A004352', licensePlate: 'ABC-1234', year: 2020, make: 'Toyota', model: 'Camry', bodyStyle: 'Sedan', color: 'Blue', miles: 45000, rentalPrice: 79.99, locationId: 1, fuelType: 'Gasoline', rentalStatus: 'Available' },
    { vin: 'WAUZZZ8K1DA123456', licensePlate: 'XYZ-5678', year: 2019, make: 'Audi', model: 'A4', bodyStyle: 'Sedan', color: 'Red', miles: 83000, rentalPrice: 89.99, locationId: 2, fuelType: 'Diesel', rentalStatus: 'Rented' },
    { vin: '1HGCM82633A004353', licensePlate: 'DEF-5678', year: 2021, make: 'Honda', model: 'Civic', bodyStyle: 'Coupe', color: 'Black', miles: 30000, rentalPrice: 69.99, locationId: 1, fuelType: 'Gasoline', rentalStatus: 'Available' }
  ];

  // Group cars by location
  get locations() {
    const locMap: { [key: number]: any[] } = {};
    this.cars.forEach(car => {
      if (!locMap[car.locationId]) locMap[car.locationId] = [];
      locMap[car.locationId].push(car);
    });

    // Transform to array for looping
    return Object.keys(locMap).map(key => ({
      id: key,
      cars: locMap[+key]
    }));
  }
}
