import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { User } from '../models/users';
import { PaymentInfo } from '../models/payment-info';
@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = 'http://127.0.0.1:8007/api/users'; // Replace with your backend URL

  constructor(private http: HttpClient) {}

  // BehaviorSubject to store the logged-in user data
  private loggedInUserSubject = new BehaviorSubject<User | null>(null);
  loggedInUser$ = this.loggedInUserSubject.asObservable(); // Observable for components to subscribe to
  // Fetch all users with optional pagination
  getUsers(skip: number = 0, limit: number = 100): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/?skip=${skip}&limit=${limit}`);
  }

  // Log in a user
  logIn(username: string, password: string): Observable<{ user_id: number }> {
    return this.http.get<{ user_id: number }>(
      `${this.apiUrl}/log_in?user_username=${username}&user_password=${password}`
    );
  }

  // Fetch a specific user by ID
  getUserById(userId: number): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/${userId}`);
  }
  // Fetch payment info for a user by user_id
  getPaymentInfoByUserId(userId: number): Observable<PaymentInfo[]> {
    return this.http.get<PaymentInfo[]>(`${this.apiUrl}/${userId}`);
  }
  // Create a new user
  createUser(user: User): Observable<User> {
    return this.http.post<User>(this.apiUrl, user);
  }

  // Update an existing user
  updateUser(user: User): Observable<User> {
    return this.http.put<User>(this.apiUrl, user);
  }

  // Delete a user by ID
  deleteUser(userId: number): Observable<{ detail: string }> {
    return this.http.delete<{ detail: string }>(`${this.apiUrl}/${userId}`);
  }

  // Store the logged-in user data
  setLoggedInUser(user: User): void {
    this.loggedInUserSubject.next(user); // Update the BehaviorSubject
    localStorage.setItem('loggedInUser', JSON.stringify(user)); // Persist user data in localStorage
  }

  // Clear the logged-in user data
  clearLoggedInUser(): void {
    this.loggedInUserSubject.next(null); // Clear the BehaviorSubject
    localStorage.removeItem('loggedInUser'); // Remove user data from localStorage
  }

  // Get the logged-in user from localStorage (for app initialization)
  loadLoggedInUserFromStorage(): void {
    const userData = localStorage.getItem('loggedInUser');
    if (userData) {
      this.loggedInUserSubject.next(JSON.parse(userData));
    }
  }
}