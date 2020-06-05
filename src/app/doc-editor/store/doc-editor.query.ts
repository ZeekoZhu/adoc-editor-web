import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';
import { DocEditorStore, DocEditorState } from './doc-editor.store';
import { debounceTime, flatMap } from 'rxjs/operators';
import { AdocService } from '../services';

@Injectable({ providedIn: 'root' })
export class DocEditorQuery extends Query<DocEditorState> {

    constructor(protected store: DocEditorStore,
                private adoc: AdocService) {
        super(store);
    }

    renderResult$ = this.select('content').pipe(
        debounceTime(100),
        flatMap(x => this.adoc.convert(x)),
    );
}
