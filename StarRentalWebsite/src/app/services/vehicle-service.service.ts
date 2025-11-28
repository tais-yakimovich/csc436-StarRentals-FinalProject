import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Vehicle } from '../models/vehicle';
@Injectable({
  providedIn: 'root',
})
export class VehicleServiceService {
  private apiUrl = 'http://127.0.0.1:8007/api/vehicles'; // Replace with your API endpoint

  constructor(private http: HttpClient) {}

  getVehicles(): Observable<Vehicle[]> {
    return this.http.get<Vehicle[]>(this.apiUrl);
  }

  // Add a new car
  addCar(car: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/add`, car);
  }

  // Delete a car by VIN
  deleteCar(vin: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/delete/${vin}`);
  }

  // Fetch a specific vehicle by VIN
  locateCar(vin: string): Observable<Vehicle> {
    return this.http.get<Vehicle>(`${this.apiUrl}/${vin}`);
  }

}
