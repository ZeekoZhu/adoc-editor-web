import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';
import { distinctUntilChanged } from 'rxjs/operators';

import { DocEditorState, DocEditorStore } from './doc-editor.store';

@Injectable({ providedIn: 'root' })
export class DocEditorQuery extends Query<DocEditorState> {

    constructor(protected override store: DocEditorStore) {
        super(store);
    }

    showPreview$ = this.select('showPreview').pipe(
        distinctUntilChanged(),
    );
}
