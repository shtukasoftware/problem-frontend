import {Component, signal} from '@angular/core';
import {KatexDirective} from '../../katex/katex.directive';
import {HttpClient} from '@angular/common/http';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'home',
  templateUrl: './home.html',
  imports: [KatexDirective, FormsModule]
})
export class HomeComponent {
  constructor(private http: HttpClient) {}

}
