import { Ace, Range } from 'ace-builds';
import Editor = Ace.Editor;
import { AdocEditorCommand } from './toolbar-commands';
import { caseWhen } from '@elmish-ts/tagged-union';
import { ColumnConfigForm, TableConfigForm } from '@app/doc-editor/doc-editor-forms';

declare module 'ace-builds' {
    namespace Ace {
        interface Editor {
            insertSnippet(snippetText: string): void;
        }
    }
}

const inlineMarkHandler = (delimiter: string) => (editor: Editor) => {
    const snippet = delimiter + '$1' + delimiter;
    if (editor.getSelectionRange().isEmpty()) {
        editor.insertSnippet(snippet);
    } else {
        const selected = editor.getSelectedText();
        editor.insert(delimiter + selected + delimiter);
    }
    editor.focus();
};

const headerHandler = (level: number) => (editor: Editor) => {
    const row = editor.getCursorPosition().row;
    const levelMark = '='.repeat(level + 1);
    const line = editor.session.getDocument().getLine(row);
    const headerRegex = /^=+/;
    const found = line.match(headerRegex);
    if (found) {
        if (found[0].length !== level + 1) {
            const currentMarkRange = new Range(row, 0, row, found[0].length);
            editor.session.replace(currentMarkRange, levelMark);
        }
    } else if (found === null) {
        editor.session.insert({ row, column: 0 }, levelMark + ' ');
    }
    editor.focus();
};

const formatColumn = (cfg: ColumnConfigForm) => {
    let result = '';
    // default horizontal alignment is left (<)
    if (cfg.hAlign !== '<') {
        result += cfg.hAlign;
    }
    // default vertical alignment is top (<)
    if (cfg.vAlign !== '<') {
        result += '.' + cfg.vAlign;
    }
    result += cfg.width;
    // default column style is 'd'
    if (cfg.style !== 'd') {
        result += 'd';
    }
    return result;
};

const formatColumns = (columnConfigs: ColumnConfigForm[]) => {
    const map = new Map<string, number>();
    for (const cfg of columnConfigs) {
        const formatted = formatColumn(cfg);
        if (map.has(formatted)) {
            map.set(formatted, map.get(formatted) + 1);
        } else {
            map.set(formatted, 1);
        }
    }

    const distinct =
        Array.from(map.entries()).map(([ formatted, cnt ]) => {
            if (cnt > 1) {
                return `${cnt}*${formatted}`;
            }
            return formatted;
        });
    return distinct.join(', ');
};

const formatTableOptions = function* (cfg: TableConfigForm) {
    if (cfg.rotate) {
        yield 'rotate';
    }
    if (cfg.header) {
        yield 'header';
    } else {
        yield 'noheader';
    }
    if (cfg.footer) {
        yield 'footer';
    }
    if (cfg.autoWidth) {
        yield 'autowidth';
    }
};

const formatTableAttributes = function* (cfg: TableConfigForm) {
    yield `cols="${formatColumns(cfg.columnConfigs)}"`;
    const options = Array.from(formatTableOptions(cfg)).join(', ');
    yield `options="${options}"`;
    if (cfg.striping !== 'none') {
        yield 'stripes=' + cfg.striping;
    }
    if (cfg.frame !== 'all') {
        yield 'frame=' + cfg.frame;
    }
    if (cfg.grid !== 'all') {
        yield 'grid=' + cfg.grid;
    }
    if (cfg.width !== 100) {
        yield 'width=' + cfg.width;
    }
};

const tableHandler = (tableConfig: TableConfigForm) => (editor: Editor) => {
    const attr = `[${Array.from(formatTableAttributes(tableConfig)).join(', ')}]`;
    const snippet = `
${attr}
${tableConfig.separator}===
$1
${tableConfig.separator}===
`;
    editor.insertSnippet(snippet);
    editor.focus();
};

export const commandHandler = (cmd: AdocEditorCommand, editor: Editor) => {
    caseWhen(cmd, {
        bold: () => inlineMarkHandler('**')(editor),
        italic: () => inlineMarkHandler('__')(editor),
        braces: () => inlineMarkHandler('``')(editor),
        header: (level: number) => headerHandler(level)(editor),
        table: (data: TableConfigForm) => tableHandler(data)(editor),
        focus: () => editor.focus(),
    });
};
