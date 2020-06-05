import { Component, OnInit } from '@angular/core';
import { DocEditorService } from '@app/doc-editor/store';
import { AdocEditorCommand } from '@app/doc-editor/toolbar-commands';

@Component({
    selector: 'app-editor-panel',
    templateUrl: './editor-panel.component.html',
    styleUrls: [ './editor-panel.component.less' ],
})
export class EditorPanelComponent implements OnInit {

    constructor(private docEditorSvc: DocEditorService) { }
    executeToolbarCommand(cmd: AdocEditorCommand) {
        this.docEditorSvc.adocEditorCommands$.next(cmd);
    }

    ngOnInit(): void {
    }

}
