import { AdocEditorCommand } from '@app/doc-editor/toolbar-commands';
import { Ace } from 'ace-builds';
import Editor = Ace.Editor;

export interface DocEditorService {
    executeCommand(cmd: AdocEditorCommand): void;

    initialize(editor: Editor): void;

    setContent(content: string): void;

    openTableConfig(): void;
}
