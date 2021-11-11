import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';
import { distinctUntilChanged } from 'rxjs/operators';

import { DocEditorState, EditorStore } from './editor-store.service';

@Injectable({ providedIn: 'root' })
export class EditorQuery extends Query<DocEditorState> {

    constructor(protected override store: EditorStore) {
        super(store);
    }

    showPreview$ = this.select(it => it.ui.showPreview).pipe(
        distinctUntilChanged(),
    );

    get content() {
        return this.getValue().content;
    }
}
