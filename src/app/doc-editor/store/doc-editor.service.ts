import { Ace } from 'ace-builds';
import Editor = Ace.Editor;

import { AdocEditorCommand } from '@app/doc-editor/adoc-editor-command';

export interface DocEditorService {
    executeCommand(cmd: AdocEditorCommand): void;

    initialize(editor: Editor): void;

    setContent(content: string): void;

    openTableConfig(): void;
}
