import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { def } from '@elmish-ts/tagged-union';
import { AdocEditorCommand } from '@app/doc-editor/toolbar-commands';
import { MatDialog } from '@angular/material/dialog';
import { TableConfigComponent } from '@app/doc-editor/components/table-config/table-config.component';

@Component({
    selector: 'app-editor-toolbar',
    templateUrl: './editor-toolbar.component.html',
    styleUrls: [ './editor-toolbar.component.less' ],
})
export class EditorToolbarComponent implements OnInit {
    @Output() execute = new EventEmitter<AdocEditorCommand>();
    bold = def('bold');
    italic = def('italic');
    braces = def('braces');
    codeBlock = def('codeBlock');

    headers = [ 0, 1, 2, 3, 4, 5 ].map(i => def('header', i));

    execCmd(cmd: AdocEditorCommand) {
        this.execute.emit(cmd);
    }

    async openTableConfig() {
        const ref = this.dialog.open(TableConfigComponent, {});
        ref.afterClosed().subscribe(() => {
            this.execCmd(def('focus'));
        });
    }

    constructor(private dialog: MatDialog) { }

    ngOnInit(): void {
    }

}
