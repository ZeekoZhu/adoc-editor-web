import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AdocEditorCommand  } from '@app/doc-editor/adoc-editor-command';
import { commandHandler } from '@app/doc-editor/adoc-editor-command-handlers';
import { TableConfigComponent } from '@app/doc-editor/components/adoc-table/table-config/table-config.component';
import { EditorService } from '@app/doc-editor/store/editor.service';
import { Ace } from 'ace-builds';
import { Subject } from 'rxjs';
import { EditorStore } from './editor-store.service';
import Editor = Ace.Editor;

/**
 * execute adoc editor command to the ace editor
 */
@Injectable()
export class AceEditorService implements EditorService {
    protected initialized = false;
    protected editor: Editor;
    protected adocEditorCommands$ = new Subject<AdocEditorCommand>();

    constructor(private store: EditorStore, private dialog: MatDialog) {
    }

    initialize(editor: Editor) {
        if (this.initialized) {
            throw new Error('Editor has been initialized');
        }
        this.editor = editor;
        this.adocEditorCommands$.subscribe(cmd => commandHandler(cmd, editor));
        this.initialized = true;
    }

    openTableConfig() {
        const ref = this.dialog.open(TableConfigComponent, {});
        ref.afterClosed().subscribe(() => {
            this.adocEditorCommands$.next({ kind: 'focus' });
        });
    }

    executeCommand(cmd: AdocEditorCommand): void {
        this.adocEditorCommands$.next(cmd);
    }
}
