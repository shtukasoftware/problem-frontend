import {Component, signal} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ActivatedRoute, RouterLink} from '@angular/router';
import {Problem} from './problems';
import {FormsModule} from '@angular/forms';
import {jwtDecode} from 'jwt-decode';
import {MyToken} from '../../services/user';
import {KatexPipe} from '../../pipes/katex.pipe';

@Component({
  selector: 'app-problem',
  templateUrl: './problem.html',
  imports: [
    FormsModule,
    KatexPipe,
    RouterLink,
  ]
})
export class ProblemComponent {
  constructor(private http: HttpClient, private route: ActivatedRoute) {
  }
  id: number = -1;
  problemFound = signal(false);
  isLoggedIn = signal(false);
  problem = signal<Problem>({
    id: -1,
    title: "",
    statement: "",
    tags: []
  });
  problemNumber = signal(0);
  answer = ''
  output = signal('')
  solved = signal(false);
  ngOnInit() {
    this.id = Number(this.route.snapshot.params['id']);
    this.http.get<Problem>(`/api/problems/${this.id}`).subscribe({
      next: response => {
        if (response === null) {
          return;
        }
        this.problem.set(response);
        this.problemFound.set(true);
      }
    })
    const token = localStorage.getItem('token')
    if (token !== null) {
      this.isLoggedIn.set(true);
      const decoded = jwtDecode<MyToken>(token);
      if (decoded.problemsSolved[this.id]) {
        this.solved.set(true);
        this.answer = String(decoded.problemsSolved[this.id]);
      }
    }
    this.http.get<Problem[]>('/api/problems').subscribe({
      next: response => this.problemNumber.set(response.length)
    })
  }
  onSubmit() {
    if (!isNaN(Number(this.answer)) && Number.isInteger(Number(this.answer))) {
      this.http.post<{correct: boolean, access_token?: string}>('/api/problems/solve', {
        problemId: this.id,
        answer: Number(this.answer)
      }).subscribe({
        next: response => {
          if (response.correct && response.access_token) {
            localStorage.setItem('token', response.access_token);
            this.solved.set(true);
            this.output.set('Correct!')
          } else {
            this.output.set('Wrong!')
          }
        },
        error: error => {
          this.output.set(error.message);
        }
      })
    } else {
      this.output.set('Please enter a valid integer!')
    }
  }
  onNext() {
    window.location.href = `/problems/${this.id + 1}`;
  }
  onPrev() {
    window.location.href = `/problems/${this.id - 1}`;
  }
}
