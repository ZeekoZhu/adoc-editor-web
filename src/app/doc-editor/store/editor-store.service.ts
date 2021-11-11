import { Injectable } from '@angular/core';
import { Store, StoreConfig } from '@datorama/akita';

export interface DocEditorState {
    content: string;
    ui: {
        showPreview: boolean;
    };
}

export function createInitialState(): DocEditorState {
    return {
        content: '',
        ui: {
            showPreview: false,
        },
    };
}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'doc-editor' })
export class EditorStore extends Store<DocEditorState> {
    constructor() {
        super(createInitialState());
    }

    setContent(content: string) {
        this.update({ content });
    }

    togglePreview(showPreview?: boolean) {
        if (showPreview != null) {
            this.update({
                ui: {
                    showPreview: showPreview,
                },
            });
        } else {
            this.update({
                ui: {
                    showPreview: !this.getValue().ui.showPreview,
                },
            });
        }
    }

}
