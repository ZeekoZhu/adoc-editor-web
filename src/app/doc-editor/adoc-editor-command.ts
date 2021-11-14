import { TableConfigModel } from './doc-editor-models';

interface ListBase {
    type: 'ul' | 'ol' | 'check';
    level: number;
    mark: string;
}

export interface OrderedList extends ListBase {
    type: 'ol';
    mark: '.' | string;
}

export interface UnorderedList extends ListBase {
    type: 'ul';
    mark: '*' | string;
}

export interface CheckList extends ListBase {
    checked: boolean;
}

export const ListType = {
    ul: (level: number, mark = '*'): UnorderedList => ({ type: 'ul', level, mark }),
    ol: (level: number, mark = '.'): OrderedList => ({ type: 'ol', level, mark }),
    check: (level: number, checked: boolean, mark = '*'): CheckList => ({ type: 'check', level, checked, mark }),
};

export type ListType =
    | OrderedList
    | UnorderedList
    | CheckList;

interface BaseAdocEditorCommand {
    kind: 'bold' | 'italic' | 'monospace' | 'focus' | 'highlight' | 'header' | 'list' | 'table' | 'listLevel' | 'breakList';
}

export interface AdocEditorCommandBold extends BaseAdocEditorCommand {
    kind: 'bold';
}

export interface AdocEditorCommandItalic extends BaseAdocEditorCommand {
    kind: 'italic';
}

export interface AdocEditorCommandMonospace extends BaseAdocEditorCommand {
    kind: 'monospace';
}

export interface AdocEditorCommandFocus extends BaseAdocEditorCommand {
    kind: 'focus';
}

export interface AdocEditorCommandHighlight extends BaseAdocEditorCommand {
    kind: 'highlight';
}

export interface AdocEditorCommandHeader extends BaseAdocEditorCommand {
    kind: 'header';
    level: number;
}

export interface AdocEditorCommandList extends BaseAdocEditorCommand {
    kind: 'list';
    list: ListType;
}

export interface AdocEditorCommandTable extends BaseAdocEditorCommand {
    kind: 'table';
    config: TableConfigModel;
}

export interface AdocEditorCommandListLevel extends BaseAdocEditorCommand {
    kind: 'listLevel';
    increase: boolean;
}

export interface AdocEditorCommandBreakList extends BaseAdocEditorCommand {
    kind: 'breakList';
}

export type AdocEditorCommand =
    | AdocEditorCommandBold
    | AdocEditorCommandItalic
    | AdocEditorCommandMonospace
    | AdocEditorCommandFocus
    | AdocEditorCommandHighlight
    | AdocEditorCommandHeader
    | AdocEditorCommandList
    | AdocEditorCommandTable
    | AdocEditorCommandListLevel
    | AdocEditorCommandBreakList;
