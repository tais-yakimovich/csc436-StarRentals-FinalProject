import { Component, OnInit } from '@angular/core';
import { DatePickerModule } from 'primeng/datepicker';
import { FormsModule } from '@angular/forms';
import { Button, ButtonModule } from 'primeng/button';
import { SelectModule } from 'primeng/select';
import { FloatLabelModule } from 'primeng/floatlabel';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { LocationService } from '../../services/location.service';
import { Location } from '../../models/location';
@Component({
  selector: 'app-date-range',
  imports: [FormsModule, DatePickerModule, Button, SelectModule, FloatLabelModule, IconFieldModule, InputIconModule],
  templateUrl: './date-range.component.html',
  styleUrl: './date-range.component.scss',
})
export class DateRangeComponent implements OnInit {
  cities: { name: string }[] = []; // Array to store city names
  selected_pick_up: { name: string } | null = null; // Selected pick-up city
  selected_drop_off: { name: string } | null = null; // Selected drop-off city
  dates: Date[] = []; // Selected date range

  constructor(private locationService: LocationService) {}

  ngOnInit(): void {
    // Fetch locations from the API
    this.locationService.getLocations().subscribe(
      (locations: Location[]) => {
        // Map locations to city names
        this.cities = locations.map((location) => ({ name: location.city }));
      },
      (error) => {
        console.error('Error fetching locations:', error);
      }
    );
  }
}
