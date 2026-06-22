import {Component} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-register',
  templateUrl: './register.html',
  imports: [
    FormsModule
  ]
})
export class RegisterComponent {
  constructor(private http: HttpClient) {}
  username: string = '';
  password: string = '';
  passwordConfirmation: string = '';
  output = ' '
  onSubmit() {
    if (this.password !== this.passwordConfirmation) {
      this.output = 'Passwords do not match!';
      return;
    }
    this.http.post('/api/auth/register', {
      username: this.username,
      password: this.password,
    }).subscribe({
      next: response => {
        this.output = 'Register successful!';
        window.location.href = '/login';
      },
      error: error => {
        this.output = "Register failed!" + error.message;
      }
    })
  }
}
