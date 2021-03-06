import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'app-toolbar-item',
    templateUrl: './toolbar-item.component.html',
    styleUrls: [ './toolbar-item.component.less' ],
})
export class ToolbarItemComponent implements OnInit {
    @Input() icon: string;

    constructor() { }

    ngOnInit(): void {
    }

}
