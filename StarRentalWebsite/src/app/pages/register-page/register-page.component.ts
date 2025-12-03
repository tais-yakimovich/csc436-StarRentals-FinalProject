import { Component } from '@angular/core';
import { RegisterInfoComponent } from '../../components/register-info/register-info.component';
import { RegisterLocationInfoComponent } from '../../components/register-location-info/register-location-info.component';
import { RegisterRentalsComponent } from '../../components/register-rentals/register-rentals.component';
import { RegisterRepairsComponent } from '../../components/register-repairs/register-repairs.component';
@Component({

  selector: 'app-register-page',
  imports: [RegisterInfoComponent, RegisterLocationInfoComponent, RegisterRentalsComponent, RegisterRepairsComponent],
  templateUrl: './register-page.component.html',
  styleUrl: './register-page.component.scss',
})
export class RegisterPageComponent {

}
