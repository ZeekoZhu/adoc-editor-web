import { Injectable } from '@angular/core';
import { Store, StoreConfig } from '@datorama/akita';

export interface DocEditorState {
    content: string;
}

export function createInitialState(): DocEditorState {
    return {
        content: '',
    };
}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'doc-editor' })
export class DocEditorStore extends Store<DocEditorState> {

    constructor() {
        super(createInitialState());
    }

}
