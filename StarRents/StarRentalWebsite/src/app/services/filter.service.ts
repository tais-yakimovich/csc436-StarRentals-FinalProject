import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FilterService {
  private bodyStyles: string[] = [];
  private priceMax: number | null = null;
  private fuelTypes: string[] = [];
  private locations: number[] = [];

  // Setters
  setBodyStyles(styles: string[]): void {
    this.bodyStyles = styles;
  }

  setPriceMax(price: number | null): void {
    this.priceMax = price;
  }

  setFuelTypes(types: string[]): void {
    this.fuelTypes = types;
  }

  setLocations(locations: number[]): void {
    this.locations = locations;
  }

  // Getters
  getBodyStyles(): string[] {
    return this.bodyStyles;
  }

  getPriceMax(): number | null {
    return this.priceMax;
  }

  getFuelTypes(): string[] {
    return this.fuelTypes;
  }
  getLocations(): number[] {
    return this.locations;
  }

}
