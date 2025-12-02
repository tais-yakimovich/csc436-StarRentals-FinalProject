import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PaymentInfo } from '../models/payment-info';

@Injectable({
  providedIn: 'root',
})
export class PaymentService {
  private apiUrl = 'http://127.0.0.1:8007/api/payment_info'; // Replace with your backend URL

  constructor(private http: HttpClient) {}

  // Fetch all payment infos with optional pagination
  getPaymentInfos(skip: number = 0, limit: number = 10): Observable<PaymentInfo[]> {
    return this.http.get<PaymentInfo[]>(`${this.apiUrl}/?skip=${skip}&limit=${limit}`);
  }

  // Fetch a specific payment info by payment_id
  getPaymentInfo(paymentId: number): Observable<PaymentInfo> {
    return this.http.get<PaymentInfo>(`${this.apiUrl}/${paymentId}`);
  }

  // Create a new payment info
  createPaymentInfo(paymentInfo: PaymentInfo): Observable<PaymentInfo> {
    return this.http.post<PaymentInfo>(this.apiUrl, paymentInfo);
  }

  // Update an existing payment info
  updatePaymentInfo(paymentInfo: PaymentInfo): Observable<PaymentInfo> {
    return this.http.put<PaymentInfo>(this.apiUrl, paymentInfo);
  }

  // Delete a payment info by payment_id
  deletePaymentInfo(paymentId: number): Observable<{ detail: string }> {
    return this.http.delete<{ detail: string }>(`${this.apiUrl}/${paymentId}`);
  }
}
