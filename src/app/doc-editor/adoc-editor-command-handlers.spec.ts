import { Ace } from 'ace-builds';
import * as ace from 'ace-builds';
import { commandHandler } from './adoc-editor-command-handlers';
import { isEqual } from 'lodash-es';
import '~/utils/ace-webpack-resolver';
import { addSnippets } from './components/adoc-editor/snippets';

ace.config.setModuleUrl('ace/mode/asciidoctor',
    new URL('~/utils/asciidoctor-mode.js', import.meta.url));

describe('commands', () => {
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

    describe('bold', () => {

        describe('nothing selected', () => {
            beforeEach(() => {
                editor.focus();
                editor.moveCursorTo(0, 0);
                commandHandler({ kind: 'bold' }, editor);
            });
            it('should wrap cursor', () => {
                const cursor = editor.getCursorPosition();
                expect(isEqual(cursor, { row: 0, column: 2 })).toBe(true);
            });
            it('should create bold marks', () => {
                const content = editor.session.getDocument().getAllLines().join('\n');
                expect(content).toBe('****');
            });
        });

        describe('select some text', () => {
            beforeEach(() => {
                editor.focus();
                editor.setValue('2333');
                editor.selectAll();
                commandHandler({ kind: 'bold' }, editor);
            });

            it('should wrap text', () => {
                const content = editor.getValue();
                expect(content).toBe('**2333**');
            });
        });

        afterEach(() => {
            editor.destroy();
            document.body.removeChild(editorHost);
        });
    });

    describe('header', () => {

        beforeEach(() => {
            editor.setValue('2333');
            editor.focus();
            editor.moveCursorTo(0, 4);
            commandHandler({ kind: 'header', level: 3 }, editor);
        });

        it('should add header mark', () => {
            expect(editor.getValue()).toBe('==== 2333');
        });

        describe('then set header 2', () => {
            beforeEach(() => {
                commandHandler({ kind: 'header', level: 2 }, editor);
            });
            it('should remove mark', () => {
                expect(editor.getValue()).toBe('=== 2333');
            });
        });

    });
});

