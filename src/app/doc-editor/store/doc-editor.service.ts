import { InjectionToken } from '@angular/core';

import { AdocEditorCommand } from '@app/doc-editor/adoc-editor-command';
import { Ace } from 'ace-builds';
import Editor = Ace.Editor;

export const DocEditorServiceToken = new InjectionToken('DocEditorService');
export interface DocEditorService {
    executeCommand(cmd: AdocEditorCommand): void;

    initialize(editor: Editor): void;

    setContent(content: string): void;

    openTableConfig(): void;

    togglePreview(showPreview?: boolean): void;
}
