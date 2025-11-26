import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-header',
  imports: [ButtonModule, FormsModule, RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  title = signal("Star Rentals");
}
