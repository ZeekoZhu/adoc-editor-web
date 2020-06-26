import { DocEditorService } from '@app/doc-editor/store';
import { def } from '@elmish-ts/tagged-union';
import { Ace } from 'ace-builds';
import { commandHandler } from '@app/doc-editor/adoc-editor-command-handlers';
import Command = Ace.Command;
import Editor = Ace.Editor;

const insertHeader = (level: number): Command => {
    return {
        name: 'insert-h' + level,
        bindKey: {
            win: 'alt+' + level,
            mac: 'option+' + level,
        },
        exec: editor => {
            commandHandler(def('header', level - 1), editor);
        },
    };
};

type AdocEditorCommand = (editorSvc: DocEditorService) => Command;

const bold: Command = {
    name: 'format-bold',
    bindKey: {
        win: 'ctrl+b',
        mac: 'cmd+b',
    },
    exec: editor => {
        commandHandler(def('bold'), editor);
    },
};

const italic: Command = {
    name: 'format-italic',
    bindKey: {
        win: 'ctrl+i',
        mac: 'cmd+i',
    },
    exec: editor => {
        commandHandler(def('italic'), editor);
    },
};

const braces: Command = {
    name: 'braces',
    bindKey: {
        win: 'ctrl+k',
        mac: 'cmd+k',
    },
    exec: editor => {
        commandHandler(def('braces'), editor);
    },
};

const openTableConfig: AdocEditorCommand = (svc) => {
    return {
        name: 'openTableConfig',
        bindKey: {
            win: 'ctrl+shift+t',
            mac: 'cmd+shift+t',
        },
        exec: () => {
            svc.openTableConfig();
        },
    };
};

const breakList: Command = {
    name: 'break-list',
    bindKey: {
        win: 'shift+enter',
        mac: 'shift+enter',
    },
    exec: editor => {
        const position = editor.getCursorPosition();
        const { row } = position;
        const line = editor.session.getLine(row);
        const isEmptyList = (str: string) => {
            return /^[-.*]+\s+$/.test(str) || /^\* \[[x* ]?]\s+$/.test(str);
        };
        if (isEmptyList(line)) {
            editor.session.removeFullLines(row, row);
        }
        editor.session.getDocument().insertMergedLines(position, [ '', '', '' ]);
    },
};

const list: Command = {
    name: 'insert-ul',
    bindKey: {
        win: 'ctrl+1',
        mac: 'cmd+1',
    },
    exec: editor => {
        commandHandler(def('list', { type: 'ul', level: 1, mark: '*' }), editor);
    },
};

const orderedList: Command = {
    name: 'insert-ol',
    bindKey: {
        win: 'ctrl+2',
        mac: 'cmd+2',
    },
    exec: editor => {
        commandHandler(def('list', { type: 'ol', level: 1, mark: '.' }), editor);
    },
};

const checkList: Command = {
    name: 'insert-checkList',
    bindKey: {
        win: 'ctrl+3',
        mac: 'cmd+3',
    },
    exec: editor => {
        commandHandler(def('list', { type: 'check', level: 1, mark: '*' }), editor);
    },
};

const increaseListLevel: Command = {
    name: 'increase-list-level',
    bindKey: {
        win: 'ctrl+]',
        mac: 'cmd+]',
    },
    exec: editor => commandHandler(def('listLevel', true), editor),
};

const decreaseListLevel: Command = {
    name: 'decrease-list-level',
    bindKey: {
        win: 'ctrl+[',
        mac: 'cmd+[',
    },
    exec: editor => commandHandler(def('listLevel', false), editor),
};

const headerCommands = [ 1, 2, 3, 4, 5, 6 ].map(insertHeader);
export const commands: (AdocEditorCommand | Command)[] = [
    ...headerCommands, bold, italic, braces,
    openTableConfig, breakList, list, orderedList, checkList,
    increaseListLevel, decreaseListLevel,
];
export const bindCommands = (editor: Editor, editorSvc: DocEditorService) => {
    commands.forEach(cmd => {
        if (typeof (cmd) === 'function') {
            editor.commands.addCommand(cmd(editorSvc));
        } else {
            editor.commands.addCommand(cmd);
        }
    });
};
