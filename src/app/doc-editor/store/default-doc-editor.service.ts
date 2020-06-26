import { Ace } from 'ace-builds';
import { MatDialog } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { def } from '@elmish-ts/tagged-union';
import { inject, Injectable, InjectionToken } from '@angular/core';

import Editor = Ace.Editor;
import { AdocEditorCommand } from '@app/doc-editor/adoc-editor-command';
import { DocEditorService } from '@app/doc-editor/store/doc-editor.service';
import { DocEditorStore } from './doc-editor.store';
import { TableConfigComponent } from '@app/doc-editor/components/table-config/table-config.component';
import { commandHandler } from '@app/doc-editor/adoc-editor-command-handlers';

// export const DocEditorServiceToken = new InjectionToken('DocEditorService', {
//     providedIn: 'root',
//     factory: () => new DefaultDocEditorService(inject(DocEditorStore), inject(MatDialog)),
// });

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
