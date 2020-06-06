import { Ace } from 'ace-builds';
import Command = Ace.Command;
import { commandHandler } from '../../toolbar-command-handlers';
import { def } from '@elmish-ts/tagged-union';
import Editor = Ace.Editor;

const insertHeader = (level: number): Command => {
    return {
        name: 'insert-h' + level,
        bindKey: {
            win: 'ctrl+' + level,
            mac: 'cmd+' + level,
        },
        exec: editor => {
            commandHandler(def('header', level - 1), editor);
        },
    };
};

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

const codeBlock: Command = {
    name: 'code-block',
    bindKey: {
        win: 'ctrl+l',
        mac: 'cmd+l',
    },
    exec: editor => {
        commandHandler(def('codeBlock'), editor);
    },
};

const headerCommands = [ 1, 2, 3, 4, 5, 6 ].map(insertHeader);
export const commands: Command[] = [
    ...headerCommands, bold, italic, braces, codeBlock,
];
export const bindCommands = (editor: Editor) => {
    commands.forEach(cmd => editor.commands.addCommand(cmd));
};
