import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AdocEditorCommand } from '@app/doc-editor/adoc-editor-command';
import { commandHandler } from '@app/doc-editor/adoc-editor-command-handlers';
import { TableConfigComponent } from '@app/doc-editor/components/table-config/table-config.component';
import { DocEditorService } from '@app/doc-editor/store/doc-editor.service';
import { def } from '@elmish-ts/tagged-union';
import { Ace } from 'ace-builds';
import { Subject } from 'rxjs';
import { DocEditorStore } from './doc-editor.store';
import Editor = Ace.Editor;

@Injectable()
export class DefaultDocEditorService implements DocEditorService {
    protected initialized = false;
    protected editor: Editor;
    protected adocEditorCommands$ = new Subject<AdocEditorCommand>();

    constructor(private store: DocEditorStore, private dialog: MatDialog) {
    }

    initialize(editor: Editor) {
        if (this.initialized) {
            throw new Error('Editor has been initialized');
        }
        this.editor = editor;
        this.adocEditorCommands$.subscribe(cmd => commandHandler(cmd, editor));
        this.initialized = true;
    }

    setContent(content: string) {
        this.store.update({ content });
    }

    togglePreview(showPreview?: boolean) {
        if (showPreview === undefined) {
            showPreview = !this.store.getValue().showPreview;
        }
        this.store.update({ showPreview });
    }

    openTableConfig() {
        const ref = this.dialog.open(TableConfigComponent, {});
        ref.afterClosed().subscribe(() => {
            this.adocEditorCommands$.next(def('focus'));
        });
    }

    executeCommand(cmd: AdocEditorCommand): void {
        this.adocEditorCommands$.next(cmd);
    }
}
