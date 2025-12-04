import { Routes } from '@angular/router';
import { CarPageComponent } from './pages/car-page/car-page.component';
import { UserSignInComponent } from './pages/user-sign-in/user-sign-in.component';
import { UserSignUpComponent } from './pages/user-sign-up/user-sign-up.component';
import { RegisterPageComponent } from './pages/register-page/register-page.component';
import { CarDatabasePageComponent } from './pages/car-database-page/car-database-page.component';
import { RentalReturnCardComponent } from './components/rental-return-card/rental-return-card.component';
import { ReturnCarPageComponent } from './pages/return-car-page/return-car-page.component';

export const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        component: CarPageComponent
    },
    {
        path: 'login',
        component: UserSignInComponent
    },
    {
        path: 'sign-up',
        component: UserSignUpComponent
    },
    {
        path: 'register-info',
        component: RegisterPageComponent
    },
    {
        path: 'car-database',
        component: CarDatabasePageComponent
    },
    {
        path: 'rental-returns',
        component: ReturnCarPageComponent
    }

];
