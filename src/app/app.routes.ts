import { Routes } from '@angular/router';
import {HomeComponent} from './components/home/home';
import {RegisterComponent} from './components/register/register';
import {ProfileComponent} from './components/profile/profile';
import {LoginComponent} from './components/login/login';
import {ProblemsComponent} from './components/problems/problems';
import {ProblemComponent} from './components/problems/problem';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'problems', component: ProblemsComponent },
  { path: 'problems/:id', component: ProblemComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'login', component: LoginComponent },
];
