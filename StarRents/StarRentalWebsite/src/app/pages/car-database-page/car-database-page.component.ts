import { Component } from '@angular/core';
import { CarDatabaseComponent } from '../../components/car-database/car-database.component';
import { RentedOutComponent } from '../../components/rented-out/rented-out.component';
@Component({
  selector: 'app-car-database-page',
  imports: [CarDatabaseComponent, RentedOutComponent],
  templateUrl: './car-database-page.component.html',
  styleUrl: './car-database-page.component.scss',
})
export class CarDatabasePageComponent {

}
