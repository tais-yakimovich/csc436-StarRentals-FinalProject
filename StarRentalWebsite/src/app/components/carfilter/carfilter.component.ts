import { Component } from '@angular/core';
import { AccordionModule } from 'primeng/accordion';
import { SliderModule } from 'primeng/slider';
import { FormsModule } from '@angular/forms';
import { CheckboxModule } from 'primeng/checkbox';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-carfilter',
  imports: [AccordionModule, SliderModule, FormsModule, CheckboxModule, CommonModule],
  templateUrl: './carfilter.component.html',
  styleUrl: './carfilter.component.scss',
})
export class CarfilterComponent {
  value: any;
  size: any;

  carTypes = [
    { label: "Sedan", value: "sedan" },
    { label: "SUV", value: "suv" },
    { label: "Truck", value: "truck" }
  ];
  selectedCarTypes: string[] = [];   // <-- for multiple checkboxes

  locations = [
    { label: "Kingston", value: "kingston" },
    { label: "Providence", value: "providence" },
    { label: "Narragansett", value: "narragansett" },
    { label: "Warwick", value: "warwick" }
  ];
  selectedLocation: string[] = [];   // <-- for multiple checkboxes

  transmissionTypes = [
    { label: "Gasoline", value: "gasoline" },
    { label: "Electric", value: "electric" }
  ];
  selectedTransmission: string[] = [];   // <-- for multiple checkboxes


}
