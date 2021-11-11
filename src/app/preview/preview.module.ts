import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PreviewComponent } from './preview/preview.component';
import { SharedModule } from '@app/shared';

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
}
