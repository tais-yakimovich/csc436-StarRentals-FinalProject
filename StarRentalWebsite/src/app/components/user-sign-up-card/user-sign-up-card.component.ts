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
import { RouterLink } from '@angular/router';
import { User } from '../../models/users';
import { UserService } from '../../services/user.service';
import { InputMaskModule } from 'primeng/inputmask';

@Component({
  selector: 'app-user-sign-up-card',
  imports: [SplitterModule, PasswordModule, FormsModule, IftaLabelModule, MessageModule,
    ButtonModule, FloatLabelModule, InputTextModule, IconFieldModule, InputIconModule, InputMaskModule, RouterLink],
  templateUrl: './user-sign-up-card.component.html',
  styleUrl: './user-sign-up-card.component.scss',
})
export class UserSignUpCardComponent {
  user_id: number = 0;
  username: string = '';
  password_hash: string = '';
  phone_number: string = '';
  first_name: string = '';
  last_name: string = '';
  date_of_birth: string = ''; // ISO date string (e.g., "YYYY-MM-DD")
  driver_license_number: number | null = null;
  driver_license_state: string = '';
  address_line1: string = '';
  address_line2?: string = ''; // Optional
  city: string = '';
  state: string = '';
  zip_code: number | null = null;
  country: string = '';
  created_at?: string = ''; // Optional ISO date-time string

  constructor(private userService: UserService) {}

  isFirstPage: boolean = true;
  isSecondPage: boolean = false;
  isThirdPage: boolean = false;

  secondPage(): void {
    this.isFirstPage = false;
    this.isSecondPage = true;
  }
  ThirdPage(): void {
    this.isSecondPage = false;
    this.isThirdPage = true;
  }
  signUp(): void {
    const newUser: User = {
      user_id: this.user_id,
      username: this.username,
      password_hash: this.password_hash,
      phone_number: this.phone_number,
      first_name: this.first_name,
      last_name: this.last_name,
      date_of_birth: this.date_of_birth,
      driver_license_number: this.driver_license_number!,
      driver_license_state: this.driver_license_state,
      address_line1: this.address_line1,
      address_line2: this.address_line2,
      city: this.city,
      state: this.state,
      zip_code: this.zip_code!,
      country: this.country,
      created_at: new Date().toISOString(),
    };

    this.userService.createUser(newUser).subscribe(
      (response) => {
        console.log('User created successfully:', response);
        alert('User signed up successfully!');
      },
      (error) => {
        console.error('Error signing up user:', error);
        alert('Failed to sign up. Please try again.');
      }
    );
  }

}
