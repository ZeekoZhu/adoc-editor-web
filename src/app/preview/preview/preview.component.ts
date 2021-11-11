import { Component } from '@angular/core';
import { PreviewService } from '@app/preview/preview.service';

@Component({
    selector: 'app-preview',
    templateUrl: './preview.component.html',
    styleUrls: [ './preview.component.less' ],
})
export class PreviewComponent {
    constructor(private previewSvc: PreviewService) {}

    get preview() {
        return this.previewSvc.renderedContent$;
    }
}
