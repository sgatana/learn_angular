import { Component } from '@angular/core';

import { LoginComponent } from './auth/login/login.component';
import { LoginWithReactiveComponent } from "./auth/login-with-reactive/login-with-reactive.component";
import { SignupComponent } from "./auth/signup/signup.component";

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  imports: [LoginWithReactiveComponent, SignupComponent],
})
export class AppComponent {}
