import { Component, OnInit} from '@angular/core';
import { RepairsService } from '../../services/repairs.service';
import { Repairs } from '../../models/repairs';
import { Accordion } from 'primeng/accordion';
import { AccordionModule } from 'primeng/accordion';
import { FormsModule } from '@angular/forms';
import { FloatLabel } from 'primeng/floatlabel';
import { TableModule } from 'primeng/table';
import { Button } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
@Component({
  selector: 'app-register-repairs',
  imports: [ AccordionModule, FloatLabel, FormsModule, TableModule, Button, InputTextModule],
  templateUrl: './register-repairs.component.html',
  styleUrl: './register-repairs.component.scss',
})
export class RegisterRepairsComponent implements OnInit {
  repairs: Repairs[] = []; // Array to store all vehicles
  totalRepairs: number = 0; // Total number of cars

  repair_id: number | null = null;
  repair_description: string = '';
  VIN: string = '';
  location_id: number | null = null;
  constructor(
      private repairsService: RepairsService,
    ) {}

  ngOnInit(): void {
    // Fetch all vehicles from the API
    this.repairsService.getRepairs().subscribe(
      (repairs: Repairs[]) => {
        this.repairs = repairs;
        this.totalRepairs = repairs.length;
        console.log('Fetched Locations:', this.repairs); // Debugging
      },
      (error) => {
        console.error('Error fetching repairs:', error);
      }
    );
  }

  addRepairs(): void {
      const newRepair: Repairs = {
        repair_id: this.repair_id!,
        repair_description: this.repair_description,
        VIN: this.VIN,
        location_id: this.location_id!,
      }
      this.repairsService.addRepair(newRepair).subscribe(
        (response) => {
          console.log('Location added successfully:', response);
          alert('Location added successfully!');
          // Reset the form fields
          this.repair_id = null;
          this.repair_description = '';
          this.VIN = '';
          this.location_id = null;
        },
        (error) => {
          console.error('Error adding repair:', error);
          alert('Failed to add location.');
        }
      );
    };

  deleteRepair(): void {
    if (!this.repair_id) {
      alert('Please enter a repair ID to delete the repair.');
      return;
    }

    this.repairsService.deleteRepair(this.repair_id).subscribe(
      (response) => {
        console.log('Repair deleted successfully:', response);
      },
      (error) => {
        console.error('Error locating repair:', error);
        alert('Failed to locate repair. Please check the ID and try again.');
      }
    );
  }
}
