/**
 * See: [Column Formatting](https://asciidoctor.org/docs/user-manual/#cols-format)
 */
export interface ColumnConfigModel {
    width: number;
    hAlign: '<' | '^' | '>';
    vAlign: '<' | '^' | '>';
    style: 'a' | 'e' | 'h' | 'l' | 'm' | 'd' | 's' | 'v';
}

export interface TableConfigModel {
    columns: number;
    columnConfigs: ColumnConfigModel[];
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

export interface DocEditorModels {
    tableConfig: TableConfigModel;
}

