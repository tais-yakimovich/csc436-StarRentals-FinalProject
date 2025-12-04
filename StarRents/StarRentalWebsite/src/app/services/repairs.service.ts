import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Repairs } from '../models/repairs';
@Injectable({
  providedIn: 'root',
})
export class RepairsService {
  private apiUrl = 'http://127.0.0.1:8007/api/repairs'; // Base URL for the repairs API

  constructor(private http: HttpClient) {}

  // Get all repairs with optional pagination
  getRepairs(skip: number = 0, limit: number = 10): Observable<Repairs[]> {
    return this.http.get<Repairs[]>(`${this.apiUrl}/?skip=${skip}&limit=${limit}`);
  }

  // Get a specific repair by repair_id
  getRepair(repairId: number): Observable<Repairs> {
    return this.http.get<Repairs>(`${this.apiUrl}/${repairId}`);
  }

  // Get repairs by VIN
  getRepairsByVIN(VIN: string): Observable<Repairs[]> {
    return this.http.get<Repairs[]>(`${this.apiUrl}/vin/${VIN}`);
  }

  // Create a new repair
  addRepair(repair: Repairs): Observable<Repairs> {
    return this.http.post<Repairs>(`${this.apiUrl}/`, repair);
  }

  // Update an existing repair
  updateRepair(repair: Repairs): Observable<Repairs> {
    return this.http.put<Repairs>(`${this.apiUrl}/`, repair);
  }

  // Delete a repair by repair_id
  deleteRepair(repairId: number): Observable<{ detail: string }> {
    return this.http.delete<{ detail: string }>(`${this.apiUrl}/${repairId}`);
  }
}
