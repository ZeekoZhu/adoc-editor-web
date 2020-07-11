import { Injectable } from '@angular/core';
import { Store, StoreConfig } from '@datorama/akita';

export interface DocEditorState {
    content: string;
    showPreview: boolean;
}

export function createInitialState(): DocEditorState {
    return {
        content: '',
        showPreview: false
    };
}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'doc-editor' })
export class DocEditorStore extends Store<DocEditorState> {

    constructor() {
        super(createInitialState());
    }

}
