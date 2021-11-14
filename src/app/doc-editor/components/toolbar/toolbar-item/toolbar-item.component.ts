import { Component, Input } from '@angular/core';

export type ToolbarItemInfo = {
    icon: string;
    shortCut: string;
    description: string;
};

@Component({
    selector: 'app-toolbar-item',
    templateUrl: './toolbar-item.component.html',
    styleUrls: [ './toolbar-item.component.less' ],
})
export class ToolbarItemComponent {
    @Input() item: ToolbarItemInfo;

    get tooltip(): string {
        return `${this.item.description} - ${this.item.shortCut}`;
    }

}
