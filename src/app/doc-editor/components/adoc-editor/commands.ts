import { ListType } from '@app/doc-editor/adoc-editor-command';
import { EditorService } from '@app/doc-editor/store';
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
            commandHandler({ kind: 'header', level: level - 1 }, editor);
        },
    };
};

type AdocEditorCommand = (editorSvc: EditorService) => Command;

const bold: Command = {
    name: 'format-bold',
    bindKey: {
        win: 'ctrl+b',
        mac: 'cmd+b',
    },
    exec: editor => {
        commandHandler({ kind: 'bold' }, editor);
    },
};

const italic: Command = {
    name: 'format-italic',
    bindKey: {
        win: 'ctrl+i',
        mac: 'cmd+i',
    },
    exec: editor => {
        commandHandler({ kind: 'italic' }, editor);
    },
};

const braces: Command = {
    name: 'braces',
    bindKey: {
        win: 'ctrl+k',
        mac: 'cmd+k',
    },
    exec: editor => {
        commandHandler({ kind: 'braces' }, editor);
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
        commandHandler({ kind: 'breakList' }, editor);
    },
};

const list: Command = {
    name: 'insert-ul',
    bindKey: {
        win: 'ctrl+1',
        mac: 'cmd+1',
    },
    exec: editor => {
        commandHandler({ kind: 'list', list: ListType.ul(1) }, editor);
    },
};

const orderedList: Command = {
    name: 'insert-ol',
    bindKey: {
        win: 'ctrl+2',
        mac: 'cmd+2',
    },
    exec: editor => {
        commandHandler({ kind: 'list', list: ListType.ol(1) }, editor);
    },
};

const checkList: Command = {
    name: 'insert-checkList',
    bindKey: {
        win: 'ctrl+3',
        mac: 'cmd+3',
    },
    exec: editor => {
        commandHandler({ kind: 'list', list: ListType.check(1, false) }, editor);
    },
};

const increaseListLevel: Command = {
    name: 'increase-list-level',
    bindKey: {
        win: 'ctrl+]',
        mac: 'cmd+]',
    },
    // exec: editor => commandHandler(def('listLevel', true), editor),
    exec: editor => commandHandler({ kind: 'listLevel', increase: true }, editor),
};

const decreaseListLevel: Command = {
    name: 'decrease-list-level',
    bindKey: {
        win: 'ctrl+[',
        mac: 'cmd+[',
    },
    exec: editor => commandHandler({ kind: 'listLevel', increase: false }, editor),
};

const headerCommands = [ 1, 2, 3, 4, 5, 6 ].map(insertHeader);
export const commands: (AdocEditorCommand | Command)[] = [
    ...headerCommands, bold, italic, braces,
    openTableConfig, breakList, list, orderedList, checkList,
    increaseListLevel, decreaseListLevel,
];
export const bindCommands = (editor: Editor, editorSvc: EditorService) => {
    commands.forEach(cmd => {
        if (typeof (cmd) === 'function') {
            editor.commands.addCommand(cmd(editorSvc));
        } else {
            editor.commands.addCommand(cmd);
        }
    });
};
