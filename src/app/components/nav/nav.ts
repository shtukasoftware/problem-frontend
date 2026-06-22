import {Component, signal} from '@angular/core';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.html',
  imports: [RouterLink]
})
export class NavComponent {
  isLoggedIn = signal(false);
  ngOnInit() {
    if (localStorage.getItem('token')) {
      this.isLoggedIn.set(true);
    }
  }
}
