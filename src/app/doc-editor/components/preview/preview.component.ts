import { Component, OnInit } from '@angular/core';
import { DocEditorQuery } from '@app/doc-editor/store';
import { DomSanitizer } from '@angular/platform-browser';
import { map } from 'rxjs/operators';

@Component({
    selector: 'app-preview',
    templateUrl: './preview.component.html',
    styleUrls: [ './preview.component.less' ],
})
export class PreviewComponent implements OnInit {
    previewHtml$ = this.docEditorQuery.renderResult$.pipe(
        map(html => this.sanitizer.bypassSecurityTrustHtml(html))
    );

    constructor(private docEditorQuery: DocEditorQuery, private sanitizer: DomSanitizer) {}

    ngOnInit(): void {
    }

}
