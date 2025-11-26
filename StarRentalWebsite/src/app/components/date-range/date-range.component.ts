import { Component } from '@angular/core';
import { DatePickerModule } from 'primeng/datepicker';
import { FormsModule } from '@angular/forms';
import { Button, ButtonModule } from 'primeng/button';
import { SelectModule } from 'primeng/select';
import { FloatLabelModule } from 'primeng/floatlabel';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
@Component({
  selector: 'app-date-range',
  imports: [FormsModule, DatePickerModule, Button, SelectModule, FloatLabelModule, IconFieldModule, InputIconModule],
  templateUrl: './date-range.component.html',
  styleUrl: './date-range.component.scss',
})
export class DateRangeComponent {
  returnDate: Date | null = null;
  date: any;
  dates: any;
  pick_time: any;
  return_time: any;
  cities = [
    { name: 'Kingston', code: 'TYO' },
    { name: 'Providence', code: 'OSA' },
    { name: 'Narragansett', code: 'KYO' },
    { name: 'Warwick', code: 'NGO' }
  ];
  selected_pick_up: any;
  selected_drop_off: any;
}
