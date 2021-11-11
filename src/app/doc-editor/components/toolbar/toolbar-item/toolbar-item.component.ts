import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-toolbar-item',
    templateUrl: './toolbar-item.component.html',
    styleUrls: [ './toolbar-item.component.less' ],
})
export class ToolbarItemComponent {
    @Input() icon: string;

    constructor() { }

}
