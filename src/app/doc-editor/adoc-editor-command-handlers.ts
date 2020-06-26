import { caseWhen, Def, def } from '@elmish-ts/tagged-union';
import { Ace, Range } from 'ace-builds';

import { ColumnConfigModel, TableConfigModel } from './doc-editor-forms';
import { AdocEditorCommand, CheckList, ListType} from './adoc-editor-command';
import Editor = Ace.Editor;

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

const formatColumn = (cfg: ColumnConfigModel) => {
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

const formatColumns = (columnConfigs: ColumnConfigModel[]) => {
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

const formatTableOptions = function* (cfg: TableConfigModel) {
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

const formatTableAttributes = function* (cfg: TableConfigModel) {
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

const tableHandler = (tableConfig: TableConfigModel) => (editor: Editor) => {
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

const matchListMark = (line: string) => /^([*-.]+)\s+(.*)$/.exec(line);

const matchChecklistMark = (str: string) => /^\[([*xX ])]\s+/.exec(str);

const getListInfo = (line: string): ListType | null => {
    const match = matchListMark(line);
    if (match === null) {
        return null;
    }
    const mark = match[1][0];
    const level = match[1].length;
    if (mark === '.') {
        return { type: 'ol', level, mark };
    }
    const checklistMatch = matchChecklistMark(match[2]);
    if (checklistMatch !== null) {
        const isChecked = checklistMatch[1] !== ' ';
        return { type: 'check', level, mark, checked: isChecked };
    }
    return { type: 'ul', level, mark };
};

const listHandler = (newList: ListType) => (editor: Editor) => {
    const { row } = editor.getCursorPosition();
    const line = editor.session.getLine(row);
    const originList = getListInfo(line);
    const operations = [];
    if (originList === null) {
        operations.push(def('add', newList));
    } else {
        if (newList.type === originList.type) {
            if (originList.type === 'check') {
                const checkList = originList as CheckList;
                operations.push(...replaceList(originList, { ...originList, checked: !checkList.checked }));
            } else {
                operations.push(def('remove', originList));
            }
        } else {
            operations.push(...replaceList(originList, newList));
        }
    }
    operations.forEach(op => modifyList(op, editor));
};

type ListModification =
    | Def<'add', [ ListType ]>
    | Def<'remove', [ ListType ]>;

const toListString = (list: ListType): string => {
    let result = '';
    switch (list.type) {
        case 'ul':
        case 'ol':
            result = list.mark.repeat(list.level);
            break;
        case 'check':
            const checkList = list as CheckList;
            result = `${'*'.repeat(list.level)} [${checkList.checked === true ? 'x' : ' '}]`;
            break;
    }
    return result + ' ';
};

const addList = (list: ListType, editor: Editor) => {
    const doc = editor.session.getDocument();
    const currentPosition = editor.getCursorPosition();
    doc.insert({ row: currentPosition.row, column: 0 }, toListString(list));
};

const removeList = (editor: Editor) => {
    const doc = editor.session.getDocument();
    const { row } = editor.getCursorPosition();
    const line = editor.session.getLine(row);
    const listRegex = /^([*-.]+(\s+\[[xX* ]])?\s+)/;
    const match = listRegex.exec(line);
    if (match !== null) {
        doc.remove(new Range(row, 0, row, match[0].length));
    }
};

const modifyList = (modification: ListModification, editor: Editor) => {
    caseWhen(modification, {
        add: list => addList(list, editor),
        remove: () => removeList(editor),
    });
};

const replaceList = (originList: ListType, newList: ListType): ListModification[] => {
    return [ def('remove', originList), def('add', newList) ];
};

const changeListLevel = (increase: boolean) => editor => {
    const position = editor.getCursorPosition();
    const { row } = position;
    const line = editor.session.getLine(row);
    const originList = getListInfo(line);
    if (originList === null) {
        return;
    }
    const modification: ListModification[] = [];

    const newList = { ...originList, level: originList.level + (increase ? 1 : -1) };
    if (newList.level === 0) {
        modification.push(def('remove', originList));
    } else {
        modification.push(...replaceList(originList, newList));
    }
    modification.forEach(x => modifyList(x, editor));
};

export const commandHandler = (cmd: AdocEditorCommand, editor: Editor) => {
    caseWhen(cmd, {
        bold: () => inlineMarkHandler('**')(editor),
        italic: () => inlineMarkHandler('__')(editor),
        braces: () => inlineMarkHandler('``')(editor),
        header: (level: number) => headerHandler(level)(editor),
        table: (data: TableConfigModel) => tableHandler(data)(editor),
        focus: () => editor.focus(),
        list: type => listHandler(type)(editor),
        listLevel: increase => changeListLevel(increase)(editor),
    });
};
