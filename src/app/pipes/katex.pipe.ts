import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import katex from 'katex';

@Pipe({ name: 'katex', standalone: true })
export class KatexPipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {}

  transform(value: string): SafeHtml {
    value = value.replace(/\$\$(.+?)\$\$/gs, (_, tex) => {
      try {
        return katex.renderToString(tex.trim(), { displayMode: true, throwOnError: false });
      } catch { return tex; }
    });
    value = value.replace(/\$(.+?)\$/g, (_, tex) => {
      try {
        return katex.renderToString(tex, { displayMode: false, throwOnError: false });
      } catch { return tex; }
    });
    return this.sanitizer.bypassSecurityTrustHtml(value);
  }
}
