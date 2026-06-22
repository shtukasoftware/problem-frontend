import {Component} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {RouterLink} from '@angular/router';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.html',
  imports: [
    RouterLink,
    FormsModule
  ]
})
export class LoginComponent {
  constructor(private http: HttpClient) {}
  username = '';
  password = '';
  output = '';
  onSubmit() {
    this.http.post<{ access_token: string }>('/api/auth/login', {
      username: this.username,
      password: this.password
    }).subscribe({
      next: (response) => {
        localStorage.setItem('token', response.access_token)
        this.output = 'Login successful!';
        window.location.href = '/problems';
      },
      error: (error) => {
        this.output = 'Login failed!';
      }
    })
  }
}
