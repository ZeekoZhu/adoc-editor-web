import { Def } from '@elmish-ts/tagged-union';
import { TableConfigModel } from './doc-editor-models';

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
    | Def<'table', [ TableConfigModel ]>
    | Def<'list', [ ListType ]>
    | Def<'listLevel', [ boolean ]>
    | Def<'breakList'>
    | Def<'focus'>;