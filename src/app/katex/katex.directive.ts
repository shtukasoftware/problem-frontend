// src/app/shared/katex.directive.ts
import { Directive, ElementRef, Input, OnChanges } from '@angular/core';
import katex from 'katex';

@Directive({
  selector: '[appKatex]',
  standalone: true
})
export class KatexDirective implements OnChanges {
  @Input('appKatex') expression: string = '';
  @Input() displayMode: boolean = false;

  constructor(private el: ElementRef) {}

  ngOnChanges() {
    if (this.expression) {
      katex.render(this.expression, this.el.nativeElement, {
        throwOnError: false,
        displayMode: this.displayMode
      });
    }
  }
}
