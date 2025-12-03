import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Vehicle } from '../models/vehicle';
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

}
