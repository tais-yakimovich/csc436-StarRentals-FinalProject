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
@Component({
  selector: 'app-user-login-card',
  imports: [SplitterModule, PasswordModule, FormsModule, IftaLabelModule, MessageModule,
     ButtonModule, FloatLabelModule, InputTextModule, IconFieldModule, InputIconModule, RouterLink],
  templateUrl: './user-login-card.component.html',
  styleUrl: './user-login-card.component.scss',
})
export class UserLoginCardComponent {

  // For p-password if you prefer separate variable (optional)
  value: string = '';
  password: any;
  email: any;


}
