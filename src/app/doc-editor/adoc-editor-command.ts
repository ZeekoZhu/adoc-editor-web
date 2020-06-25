import { Def } from '@elmish-ts/tagged-union';
import { TableConfigForm } from './doc-editor-forms';

interface ListBase {
    type: 'ul' | 'ol' | 'check';
    level: number;
    mark: string;
}

export type OrderedList = ListBase;

export type UnorderedList = ListBase ;

export interface CheckList extends ListBase {
    checked: boolean;
}

export type ListType =
    | OrderedList
    | UnorderedList
    | CheckList;

export type AdocEditorCommand =
    | Def<'bold'>
    | Def<'italic'>
    | Def<'braces'>
    | Def<'header', [ number ]>
    | Def<'table', [ TableConfigForm ]>
    | Def<'list', [ ListType ]>
    | Def<'listLevel', [ boolean ]>
    | Def<'focus'>;
