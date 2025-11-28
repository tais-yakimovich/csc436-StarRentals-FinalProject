import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Location } from '../models/location';
@Injectable({
  providedIn: 'root',
})
export class LocationService {
  private apiUrl = 'http://127.0.0.1:8007/api/locations/?skip=0&limit=100'; // Replace with your API endpoint

  constructor(private http: HttpClient) {}
  
  // Fetch all locations
  getLocations(): Observable<Location[]> {
    return this.http.get<Location[]>(this.apiUrl);
  }
  // Add a new location
  addLocation(location: Location): Observable<Location> {
    return this.http.post<Location>(`${this.apiUrl}/add`, location);
  }
  // Fetch a single location by ID
  getLocationById(locationId: number): Observable<Location> {
    return this.http.get<Location>(`${this.apiUrl}/${locationId}`);
  }
}
