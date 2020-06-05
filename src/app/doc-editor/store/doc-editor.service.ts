import { Injectable } from '@angular/core';
import { DocEditorStore } from './doc-editor.store';
import { Subject } from 'rxjs';
import { AdocEditorCommand } from '@app/doc-editor/toolbar-commands';

@Injectable({ providedIn: 'root' })
export class DocEditorService {
    adocEditorCommands$ = new Subject<AdocEditorCommand>();

    constructor(private store: DocEditorStore) {
    }

    setContent(content: string) {
        this.store.update({ content });
    }
}
