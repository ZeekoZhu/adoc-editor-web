import { Component, Inject } from '@angular/core';
import {
    AdocEditorCommand,
    ListType,
} from '@app/doc-editor/adoc-editor-command';
import { DocEditorServiceToken, EditorQuery, EditorService, EditorStore } from '@app/doc-editor/store';
import { PreviewService } from '@app/preview/preview.service';
import { ToolbarItemInfo } from '@app/doc-editor/components';

type ToolbarItemWithCommand = ToolbarItemInfo & { command: AdocEditorCommand };

@Component({
    selector: 'app-editor-toolbar',
    templateUrl: './editor-toolbar.component.html',
    styleUrls: [ './editor-toolbar.component.less' ],
})
export class EditorToolbarComponent {
    headers: AdocEditorCommand[] = [ 0, 1, 2, 3, 4, 5 ].map(i => ({ kind: 'header', level: i }));
    ul: AdocEditorCommand = { kind: 'list', list: ListType.ul(1) };
    ol: AdocEditorCommand = { kind: 'list', list: ListType.ol(1) };
    check: AdocEditorCommand = { kind: 'list', list: ListType.check(1, false) };
    focus: AdocEditorCommand = { kind: 'focus' };

    leftItems: ToolbarItemWithCommand[] = [
        {
            icon: 'format-bold',
            shortCut: 'Ctrl + B',
            description: 'Bold',
            command: { kind: 'bold' },
        },
        {
            icon: 'format-italic',
            shortCut: 'Ctrl + I',
            description: 'Italic',
            command: { kind: 'italic' },
        },
        {
            icon: 'code-braces',
            shortCut: 'Ctrl + K',
            description: 'Monospace',
            command: { kind: 'monospace' },
        },
        {
            icon: 'format-color-highlight',
            shortCut: 'Ctrl + M',
            description: 'Highlight Text',
            command: { kind: 'highlight' },
        },
        {
            icon: 'format-underline',
            shortCut: '',
            description: 'Underline',
            command: { kind: 'role', role: 'underline' },
        },
        {
            icon: 'format-strikethrough',
            shortCut: '',
            description: 'Strikethrough',
            command: { kind: 'role', role: 'line-through' },
        },
    ];
    headingItem = {
        shortCut: 'Alt + 1/2/3/4/5',
        description: 'Heading',
        icon: 'format-header-pound',
    } as ToolbarItemInfo;
    tableItem = {
        shortCut: 'Alt + T',
        description: 'Table',
        icon: 'table',
    } as ToolbarItemInfo;

    listItem = {
        shortCut: 'Ctrl + 1/2/3',
        description: 'List',
        icon: 'format-list-bulleted-square',
    } as ToolbarItemInfo;

    previewItem = {
        shortCut: 'Alt + P',
        description: 'Preview',
        icon: 'tray-full',
    } as ToolbarItemInfo;

    execCmd(...commands: AdocEditorCommand[]) {
        commands.forEach(cmd => this.docEditorSvc.executeCommand(cmd));
    }

    async openTableConfig() {
        this.docEditorSvc.openTableConfig();
    }

    constructor(@Inject(DocEditorServiceToken) private docEditorSvc: EditorService,
                private previewSvc: PreviewService,
                private editorQuery: EditorQuery,
                private editorStore: EditorStore) {}

    showPreview() {
        this.editorStore.togglePreview(true);
        this.previewSvc.scheduleRender(this.editorQuery.content);
    }
}
