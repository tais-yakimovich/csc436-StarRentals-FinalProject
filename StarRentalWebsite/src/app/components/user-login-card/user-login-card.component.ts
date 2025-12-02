import { Component } from '@angular/core';
import { SplitterModule } from 'primeng/splitter';
import { PasswordModule } from 'primeng/password';
import { FormsModule, NgForm } from '@angular/forms';
import { IftaLabelModule } from 'primeng/iftalabel';
import { MessageModule } from 'primeng/message';
import { ButtonModule } from 'primeng/button';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../../services/user.service';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-user-login-card',
  imports: [SplitterModule, PasswordModule, FormsModule, IftaLabelModule, MessageModule,
     ButtonModule, FloatLabelModule, InputTextModule, IconFieldModule, InputIconModule, RouterLink, [CommonModule]],
  templateUrl: './user-login-card.component.html',
  styleUrl: './user-login-card.component.scss',
})
export class UserLoginCardComponent {
  username: string = '';
  password: string = '';
  isLoggedIn: boolean = false; // Tracks if the user is signed in
  errorMessage: string = ''; // Stores error messages

  constructor(private userService: UserService, private router: Router) {}

  // Handle user login
  logIn(): void {
    if (!this.username || !this.password) {
      alert('Please enter your username and password.');
      return;
    }

    this.userService.logIn(this.username, this.password).subscribe(
      (response) => {
        console.log('Login successful:', response);
        // Fetch the full user details using the user_id
        this.userService.getUserById(response.user_id).subscribe((user) => {
          this.userService.setLoggedInUser(user); // Store the logged-in user data
          this.isLoggedIn = true; // Set the user as logged in
          this.router.navigate(['']); // Redirect to a dashboard or home page
        });
      },
      (error) => {
        alert('Incorrect Username or password');
      }
    );
  }
  // Handle user logout
  logOut(): void {
    this.isLoggedIn = false;
    localStorage.removeItem('user_id'); // Clear user ID from local storage
    this.router.navigate(['/login']); // Redirect to the login page
  }

}
