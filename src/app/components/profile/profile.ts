import {Component, signal} from '@angular/core';
import {RouterLink} from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { MyToken } from '../../services/user';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.html',
  imports: [
    RouterLink
  ]
})
export class ProfileComponent {
  constructor(private http: HttpClient) {}
  isLoggedIn = signal(false);
  username: string = ''
  n: number = 0;
  private jwt: any;
  ngOnInit() {
    const token = localStorage.getItem('token')
    if (token !== null) {
      this.isLoggedIn.set(true);
      const decoded = jwtDecode<MyToken>(token);
      this.username = decoded.username;
      this.n = Object.keys(decoded.problemsSolved).length;
    }
  }
  logout() {
    localStorage.removeItem('token');
    window.location.href = '/';
  }
  delete() {
    this.http.delete('/api/auth/user').subscribe({
      next: () => {
        localStorage.removeItem('token');
        window.location.href = '/';
      }
    });

  }
}
