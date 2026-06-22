import {Component, signal, Signal} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {RouterLink} from '@angular/router';
import {jwtDecode} from 'jwt-decode';
import {MyToken} from '../../services/user';

export interface Problem {
  id: number;
  title: string;
  statement: string;
  tags: string[];
}

@Component({
  selector: 'app-problems',
  templateUrl: './problems.html',
  imports: [
    RouterLink
  ]
})
export class ProblemsComponent {
  constructor(private http: HttpClient) {}
  problems = signal<Problem[]>([]);
  isLoggedIn = signal(true);
  problemsSolved: Record<number, number> = [];
  ngOnInit(): void {
    console.log('ProblemsComponent init');
    this.http.get<Problem[]>('/api/problems').subscribe({
      next: response => {
        this.problems.set(response);
      },
    });

    const token = localStorage.getItem('token');
    if (token) {
      this.isLoggedIn.set(true);
      const decoded = jwtDecode<MyToken>(token);
      this.problemsSolved = decoded.problemsSolved
    }
  }
}
