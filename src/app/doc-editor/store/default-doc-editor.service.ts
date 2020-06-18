import { inject, Injectable, InjectionToken } from '@angular/core';
import { DocEditorStore } from './doc-editor.store';
import { Subject } from 'rxjs';
import { AdocEditorCommand } from '@app/doc-editor/toolbar-commands';
import { MatDialog } from '@angular/material/dialog';
import { TableConfigComponent } from '@app/doc-editor/components/table-config/table-config.component';
import { Ace } from 'ace-builds';
import { def } from '@elmish-ts/tagged-union';
import { commandHandler } from '@app/doc-editor/toolbar-command-handlers';
import { DocEditorService } from '@app/doc-editor/store/doc-editor.service';
import Editor = Ace.Editor;

export const DocEditorServiceToken = new InjectionToken('DocEditorService', {
    providedIn: 'root',
    factory: () => new DefaultDocEditorService(inject(DocEditorStore), inject(MatDialog)),
});

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
