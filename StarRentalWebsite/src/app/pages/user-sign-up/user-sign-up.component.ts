import { Component } from '@angular/core';
import { UserSignUpCardComponent } from '../../components/user-sign-up-card/user-sign-up-card.component';
@Component({
  selector: 'app-user-sign-up',
  imports: [ UserSignUpCardComponent],
  templateUrl: './user-sign-up.component.html',
  styleUrl: './user-sign-up.component.scss',
})
export class UserSignUpComponent {

}
