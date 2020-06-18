import { def, Def } from '@elmish-ts/tagged-union';
import { TableConfigForm } from '@app/doc-editor/doc-editor-forms';

export type UnorderedList = Def<'ul', [ number, string ]>;
export type OrderedList = Def<'ol', [ number ]>;
export type CheckList = Def<'check', [ number, boolean ]>;

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
