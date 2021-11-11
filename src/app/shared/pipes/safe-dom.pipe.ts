import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Pipe({
    name: 'safeDom',
})
export class SafeDomPipe implements PipeTransform {

    constructor(private domSanitizer: DomSanitizer) {}

    transform(value: string | null): SafeHtml | null {
        if (!value) {
            return null;
        }
        return this.domSanitizer.bypassSecurityTrustHtml(value);
    }

}
