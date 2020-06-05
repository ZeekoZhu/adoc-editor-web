import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
    selector: 'app-table-col-config',
    templateUrl: './table-col-config.component.html',
    styleUrls: [ './table-col-config.component.less' ],
})
export class TableColConfigComponent implements OnInit {

    @Input() fg: FormGroup;

    constructor() { }

    ngOnInit(): void {
    }
}
