import { Component, OnInit, Output, EventEmitter, Input} from '@angular/core';
import { DatePickerModule } from 'primeng/datepicker';
import { FormsModule } from '@angular/forms';
import { Button, ButtonModule } from 'primeng/button';
import { SelectModule } from 'primeng/select';
import { FloatLabelModule } from 'primeng/floatlabel';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { LocationService } from '../../services/location.service';
import { Location } from '../../models/location';
import { TableModule } from 'primeng/table';
@Component({
  selector: 'app-date-range',
  imports: [FormsModule, DatePickerModule, Button, SelectModule, FloatLabelModule, IconFieldModule, InputIconModule, TableModule],
  templateUrl: './date-range.component.html',
  styleUrl: './date-range.component.scss',
})
export class DateRangeComponent implements OnInit {
  @Input() locations: { Lname: string; location_id: number }[] = [];
  @Output() search = new EventEmitter<{ pickUp: number | null; dropOff: number | null; dates: Date[] }>();
  constructor(private locationService: LocationService) {}
  
  selected_pick_up: { Lname: string; location_id: number } | null = null;
  selected_drop_off: { Lname: string; location_id: number } | null = null;
  dates: Date[] = []; // Selected date range

  ngOnInit(): void {
    // Fetch locations from the API
    this.locationService.getLocations().subscribe(
      (locations: Location[]) => {
        this.locations = locations; // Store all locations
      },
      (error) => {
        console.error('Error fetching locations:', error);
      }
    );
  }

  onSearch(): void {
    this.search.emit({
      pickUp: this.selected_pick_up ? this.selected_pick_up.location_id : null,
      dropOff: this.selected_drop_off ? this.selected_drop_off.location_id : null,
      dates: this.dates,
    });
  }

}
