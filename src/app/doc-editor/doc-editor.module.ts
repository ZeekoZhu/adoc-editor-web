import { A11yModule } from '@angular/cdk/a11y';
import { CommonModule } from '@angular/common';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatRippleModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import {
    AdocEditorComponent,
    ColumnConfigSummaryComponent,
    EditorPanelComponent,
    EditorToolbarComponent,
    PreviewComponent,
    TableColConfigComponent,
    TableConfigComponent,
    ToolbarItemComponent,
} from '@app/doc-editor/components';

@NgModule({
    declarations: [
        AdocEditorComponent,
        ColumnConfigSummaryComponent,
        EditorPanelComponent,
        EditorToolbarComponent,
        PreviewComponent,
        TableColConfigComponent,
        TableConfigComponent,
        ToolbarItemComponent,
    ],
    imports: [
        A11yModule,
        CommonModule,
        MatAutocompleteModule,
        MatButtonModule,
        MatCardModule,
        MatCheckboxModule,
        MatChipsModule,
        MatDialogModule,
        MatDividerModule,
        MatExpansionModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatListModule,
        MatMenuModule,
        MatRippleModule,
        MatSelectModule,
        MatToolbarModule,
        ReactiveFormsModule,
    ],
})
export class DocEditorModule {
}
