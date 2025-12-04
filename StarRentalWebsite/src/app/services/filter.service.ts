import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FilterService {
  private selectedFiltersSource = new BehaviorSubject<any>({
    bodyStyles: [],
    locations: [],
    fuelTypes: [],
  });

  selectedFilters$ = this.selectedFiltersSource.asObservable();

  updateFilters(filters: any): void {
    this.selectedFiltersSource.next(filters);
  }
}
