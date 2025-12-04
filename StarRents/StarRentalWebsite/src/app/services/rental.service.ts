import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RentOuts } from '../models/rent-outs';
@Injectable({
  providedIn: 'root',
})
export class RentalService {
  private apiUrl = 'http://127.0.0.1:8007/api/rental_info/?skip=0&limit=100'; 

  constructor(private http: HttpClient) {}

  getRental(): Observable<RentOuts[]> {
      return this.http.get<RentOuts[]>(this.apiUrl);
  }
  
  
  addRental(car: RentOuts): Observable<RentOuts> {
  return this.http.post<RentOuts>(`http://127.0.0.1:8007/api/rental_info/`, car); 
  }

  updateRental(car: RentOuts): Observable<RentOuts> {
  return this.http.put<RentOuts>(`http://127.0.0.1:8007/api/rental_info/`, car); 
  }
    // Delete a car by VIN
  deleteRental(rental_id: number): Observable<any> {
    return this.http.delete(`http://127.0.0.1:8007/api/rental_info/${rental_id}`);
  }
  
  // Fetch a specific vehicle by VIN
  locateRental(rental_id: number): Observable<RentOuts> {
    return this.http.get<RentOuts>(`http://127.0.0.1:8007/api/rental_info/${rental_id}`);
  }

  // Fetch rentals for a specific user
  getUserRentals(userId: number): Observable<RentOuts[]> {
    return this.http.get<RentOuts[]>(`http://127.0.0.1:8007/api/rental_info/user/${userId}`);
  }
}
