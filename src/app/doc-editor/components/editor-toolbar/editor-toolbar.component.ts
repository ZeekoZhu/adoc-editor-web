import { Component, Inject, OnInit } from '@angular/core';
import { AdocEditorCommand, ListType } from '@app/doc-editor/adoc-editor-command';
import { DocEditorService, DocEditorServiceToken } from '@app/doc-editor/store';

@Component({
    selector: 'app-editor-toolbar',
    templateUrl: './editor-toolbar.component.html',
    styleUrls: [ './editor-toolbar.component.less' ],
})
export class EditorToolbarComponent implements OnInit {
    bold: AdocEditorCommand = { kind: 'bold' };
    italic: AdocEditorCommand = { kind: 'italic' };
    braces: AdocEditorCommand = { kind: 'braces' };
    headers: AdocEditorCommand[] = [ 0, 1, 2, 3, 4, 5 ].map(i => ({ kind: 'header', level: i }));
    ul: AdocEditorCommand = { kind: 'list', list: ListType.ul(1) };
    ol: AdocEditorCommand = { kind: 'list', list: ListType.ol(1) };
    check: AdocEditorCommand = { kind: 'list', list: ListType.check(1, false) };
    focus: AdocEditorCommand = { kind: 'focus' };

    execCmd(...commands: AdocEditorCommand[]) {
        commands.forEach(cmd => this.docEditorSvc.executeCommand(cmd));
    }

    async openTableConfig() {
        this.docEditorSvc.openTableConfig();
    }

    constructor(@Inject(DocEditorServiceToken) private docEditorSvc: DocEditorService) {}

    ngOnInit(): void {
    }

    showPreview() {
        this.docEditorSvc.togglePreview(true);
    }
}
