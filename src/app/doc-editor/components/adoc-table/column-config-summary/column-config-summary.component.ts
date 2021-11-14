import { Component, Input } from '@angular/core';
import { ColumnConfigModel } from '@app/doc-editor/doc-editor-models';

@Component({
    selector: 'app-column-config-summary',
    templateUrl: './column-config-summary.component.html',
    styleUrls: [ './column-config-summary.component.less' ],
})
export class ColumnConfigSummaryComponent {

    @Input() colConfig: ColumnConfigModel;
    @Input() index: number;
    @Input() showInfo: boolean;

}
