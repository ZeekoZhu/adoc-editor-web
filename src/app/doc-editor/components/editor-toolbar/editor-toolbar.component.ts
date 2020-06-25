import { Component, Inject, OnInit } from '@angular/core';
import { def } from '@elmish-ts/tagged-union';
import { AdocEditorCommand } from '@app/doc-editor/adoc-editor-command';
import { DocEditorService, DocEditorServiceToken } from '@app/doc-editor/store';

@Component({
    selector: 'app-editor-toolbar',
    templateUrl: './editor-toolbar.component.html',
    styleUrls: [ './editor-toolbar.component.less' ],
})
export class EditorToolbarComponent implements OnInit {
    bold = def('bold');
    italic = def('italic');
    braces = def('braces');
    headers = [ 0, 1, 2, 3, 4, 5 ].map(i => def('header', i));

    execCmd(cmd: AdocEditorCommand) {
        this.docEditorSvc.executeCommand(cmd);
    }

    async openTableConfig() {
        this.docEditorSvc.openTableConfig();
    }

    constructor(@Inject(DocEditorServiceToken) private docEditorSvc: DocEditorService) {}

    ngOnInit(): void {
    }

}
