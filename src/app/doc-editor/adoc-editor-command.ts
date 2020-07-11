import { Def } from '@elmish-ts/tagged-union';
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
    | Def<'bold'>
    | Def<'italic'>
    | Def<'braces'>
    | Def<'header', [ number ]>
    | Def<'table', [ TableConfigModel ]>
    | Def<'list', [ ListType ]>
    | Def<'listLevel', [ boolean ]>
    | Def<'breakList'>
    | Def<'focus'>;
