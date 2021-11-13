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

export type AdocEditorCommand =
    | { kind: 'bold' }
    | { kind: 'italic' }
    | { kind: 'monospace' }
    | { kind: 'focus' }
    | { kind: 'header', level: number }
    | { kind: 'list', list: ListType }
    | { kind: 'table', config: TableConfigModel }
    | { kind: 'listLevel' , increase: boolean }
    | { kind: 'breakList' };
