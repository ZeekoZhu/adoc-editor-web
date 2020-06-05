import { Def } from '@elmish-ts/tagged-union';
import { TableConfigForm } from '@app/doc-editor/doc-editor-forms';

export type AdocEditorCommand =
    | Def<'bold'>
    | Def<'italic'>
    | Def<'braces'>
    | Def<'header', [ number ]>
    | Def<'table', [ TableConfigForm ]>
    | Def<'focus'>
