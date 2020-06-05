import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import {
    AdocEditorComponent,
    PreviewComponent,
    EditorPanelComponent,
} from '@app/doc-editor/components';
import { EditorToolbarComponent } from './components/editor-toolbar/editor-toolbar.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { ToolbarItemComponent } from './components/toolbar-item/toolbar-item.component';
import { MatRippleModule } from '@angular/material/core';
import { TableConfigComponent } from './components/table-config/table-config.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { TableColConfigComponent } from './components/table-col-config/table-col-config.component';
import { MatSelectModule } from '@angular/material/select';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatCardModule } from '@angular/material/card';
import { A11yModule } from '@angular/cdk/a11y';
import { ColumnConfigSummaryComponent } from './components/column-config-summary/column-config-summary.component';
import { MatChipsModule } from '@angular/material/chips';

@NgModule({
    declarations: [
        AdocEditorComponent,
        PreviewComponent,
        EditorPanelComponent,
        EditorToolbarComponent,
        ToolbarItemComponent,
        TableConfigComponent,
        TableColConfigComponent,
        ColumnConfigSummaryComponent,
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MatToolbarModule,
        MatButtonModule,
        MatMenuModule,
        MatIconModule,
        MatRippleModule,
        MatDialogModule,
        MatFormFieldModule,
        MatInputModule,
        MatDividerModule,
        MatListModule,
        MatSelectModule,
        MatAutocompleteModule,
        MatCheckboxModule,
        MatExpansionModule,
        MatCardModule,
        A11yModule,
        MatChipsModule,
    ],
})
export class DocEditorModule {
}
