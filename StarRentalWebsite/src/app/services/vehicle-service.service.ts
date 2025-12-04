import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Vehicle } from '../models/vehicle';

export interface VehicleFilters {
  body_style: string[];
  location_id: number[];
  fuel_type: string[];
}

@Injectable({
  providedIn: 'root',
})
export class VehicleServiceService {
  private apiUrl = 'http://127.0.0.1:8007/api/vehicles/?skip=0&limit=50'; 

  constructor(private http: HttpClient) {}

  getVehicles(): Observable<Vehicle[]> {
    return this.http.get<Vehicle[]>(this.apiUrl);
  }
  

  addCar(car: Vehicle): Observable<Vehicle> {
    return this.http.post<Vehicle>(`http://127.0.0.1:8007/api/vehicles/`, car); 
  }
  // Delete a car by VIN
  deleteCar(vin: string): Observable<any> {
    return this.http.delete(`http://127.0.0.1:8007/api/vehicles/${vin}`);
  }

  getAvailableCars(
    locationIds: number[],
    startDate: string,
    endDate: string,
    bodyStyles: string[] | null = null,
    priceMax: number | null = null,
    fuelTypes: string[] | null = null
  ): Observable<Vehicle[]> {
    const params = new URLSearchParams();

    if (locationIds) locationIds.forEach(id => params.append('location_id', id.toString()));
    if (startDate) params.append('start_date', startDate);
    if (endDate) params.append('end_date', endDate);
    if (bodyStyles) bodyStyles.forEach(style => params.append('body_style', style));
    if (priceMax !== null) params.append('price_max', priceMax.toString());
    if (fuelTypes) fuelTypes.forEach(fuel => params.append('fuel_type', fuel));
    
    const queryString = params.toString();
    const url = `http://127.0.0.1:8007/api/vehicles/available/filter?${queryString}`;
    return this.http.get<Vehicle[]>(url);
  }

  // Update a vehicle
  updateVehicle(vehicle: Vehicle): Observable<Vehicle> {
    return this.http.put<Vehicle>(`http://127.0.0.1:8007/api/vehicles/`, vehicle);
  }
  // Fetch a specific vehicle by VIN
  locateCar(vin: string): Observable<Vehicle> {
    return this.http.get<Vehicle>(`http://127.0.0.1:8007/api/vehicles/${vin}`);
  }
  getVehiclesAtLocation(locationId: number): Observable<Vehicle[]> {
    return this.http.get<Vehicle[]>(`http://127.0.0.1:8007/api/vehicles/location/${locationId}`);
  }

  getFilters(): Observable<VehicleFilters> {
    const url = `http://127.0.0.1:8007/api/vehicles/available/filters`;
    return this.http.get<VehicleFilters>(url);
  }

}
