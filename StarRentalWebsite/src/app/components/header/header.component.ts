import { Component, signal, OnInit} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { RouterLink } from '@angular/router';
import { User } from '../../models/users';
import { UserService } from '../../services/user.service';
@Component({
  selector: 'app-header',
  imports: [ButtonModule, FormsModule, RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {
  title = signal("Star Rentals");
  loggedInUser: User | null = null;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    // Subscribe to the logged-in user observable
    this.userService.loggedInUser$.subscribe((user) => {
      this.loggedInUser = user;
    });
  }

  logOut(): void {
    this.userService.clearLoggedInUser(); // Clear the logged-in user data
  }

}
