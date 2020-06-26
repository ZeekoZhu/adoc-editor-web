import { Component, Input, OnInit } from '@angular/core';
import { ColumnConfigModel } from '@app/doc-editor/doc-editor-forms';

@Component({
    selector: 'app-column-config-summary',
    templateUrl: './column-config-summary.component.html',
    styleUrls: [ './column-config-summary.component.less' ],
})
export class ColumnConfigSummaryComponent implements OnInit {

    @Input() colConfig: ColumnConfigModel;
    @Input() index: number;
    @Input() showInfo: boolean;

    constructor() { }

    ngOnInit(): void {
    }

}
