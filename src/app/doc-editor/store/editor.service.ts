import { InjectionToken } from '@angular/core';

import { AdocEditorCommand } from '@app/doc-editor/adoc-editor-command';
import { Ace } from 'ace-builds';
import Editor = Ace.Editor;

export const DocEditorServiceToken = new InjectionToken('DocEditorService');

/**
 * service to execute commands on the editor
 */
export interface EditorService {
    executeCommand(cmd: AdocEditorCommand): void;

    initialize(editor: Editor): void;

    openTableConfig(): void;
}
