import { def } from '@elmish-ts/tagged-union';
import { Ace } from 'ace-builds';
import * as ace from 'ace-builds';
import { commandHandler } from './adoc-editor-command-handlers';
import { isEqual } from 'lodash-es';
import 'ace-builds/webpack-resolver';
import { addSnippets } from './components/adoc-editor/snippets';
ace.config.setModuleUrl('ace/mode/asciidoctor',
    require('file-loader?esModule=false!./components/adoc-editor/asciidoctor-mode.js'));

describe('bold', () => {
    let editor: Ace.Editor;
    let editorHost: HTMLDivElement;
    beforeEach(async () => {
        editorHost = document.createElement('div');
        editorHost.style.width = '200px';
        editorHost.style.height = '50px';
        document.body.appendChild(editorHost);
        editor = ace.edit(editorHost, {
            mode: 'ace/mode/asciidoctor',
            fontSize: 16,
            showLineNumbers: false,
        });
        await addSnippets(editor);
    });

    describe('nothing selected', () => {
        beforeEach(() => {
            editor.focus();
            editor.moveCursorTo(0, 0);
            commandHandler(def('bold'), editor);
        });
        it('should wrap cursor', () => {
            const cursor = editor.getCursorPosition();
            expect(isEqual(cursor, { row: 0, column: 2 }));
        });
        it('should create bold marks', () => {
            const content = editor.session.getDocument().getAllLines().join('\n');
            expect(content).toBe('****');
        });
    });
    afterEach(() => {
        editor.destroy();
        document.body.removeChild(editorHost);
    });
});
