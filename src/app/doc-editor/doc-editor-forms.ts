/**
 * See: [Column Formatting](https://asciidoctor.org/docs/user-manual/#cols-format)
 */
export interface ColumnConfigForm {
    width: number;
    hAlign: '<' | '^' | '>',
    vAlign: '<' | '^' | '>',
    style: 'a' | 'e' | 'h' | 'l' | 'm' | 'd' | 's' | 'v',
}

export interface TableConfigForm {
    columns: number;
    columnConfigs: ColumnConfigForm[];
    header: boolean;
    footer: boolean;
    rotate: boolean;
    striping: string;
    frame: string;
    grid: string;
    width: number;
    autoWidth: boolean;
    format: 'csv' | 'tsv' | 'psv' | 'dsv';
    separator: string;
}

export interface DocEditorForms {
    tableConfig: TableConfigForm;
}

