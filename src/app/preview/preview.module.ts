import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PreviewComponent } from './preview/preview.component';
import { SharedModule } from '@app/shared';
import { PreviewService } from '@app/preview/preview.service';

@NgModule({
    declarations: [ PreviewComponent ],
    imports: [
        CommonModule,
        SharedModule,
    ],
    exports: [
        PreviewComponent,
    ],
})
export class PreviewModule {
    constructor(private previewSvc: PreviewService) {
        this.previewSvc.renderedContent$.subscribe();
    }
}
