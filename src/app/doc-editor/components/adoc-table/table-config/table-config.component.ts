import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { DocEditorModels } from '@app/doc-editor/doc-editor-models';
import { DocEditorService } from '@app/doc-editor/store';
import { DocEditorServiceToken } from '@app/doc-editor/store/doc-editor.service';
import { NgFormsManager } from '@ngneat/forms-manager';
import { filter, map } from 'rxjs/operators';

@Component({
    selector: 'app-table-config',
    templateUrl: './table-config.component.html',
    styleUrls: [ './table-config.component.less' ],
})
export class TableConfigComponent implements OnInit, OnDestroy {

    tableConfigForm: FormGroup;

    get colArray() {
        return this.tableConfigForm.get('columnConfigs') as FormArray;
    }

    get colConfigs() {
        return this.colArray.controls as FormGroup[];
    }

    colConfigAt(index: number) {
        return this.tableConfigForm.get([ 'columnConfigs', index ])?.value;
    }

    createColumnConfigControl() {
        return this.fb.group({
            width: this.fb.control(1, {
                validators: [ Validators.required, Validators.min(1) ],
            }),
            hAlign: [ '<', [ Validators.required ] ],
            vAlign: [ '<', [ Validators.required ] ],
            style: [ 'd', [ Validators.required ] ],
        });
    }

    addColumns(cnt: number) {
        for (let i = 0; i < cnt; i++) {
            const group = this.createColumnConfigControl();
            this.colArray.push(group);
        }
    }

    removeColumns(cnt: number) {
        for (let i = 0; i < cnt; i++) {
            this.colArray.removeAt(this.colArray.length - 1);
        }
    }

    initForm() {
        this.tableConfigForm =
            this.fb.group({
                columns: this.fb.control(0, {
                    updateOn: 'blur',
                    validators: [ Validators.min(1), Validators.max(100), Validators.required ],
                }),
                columnConfigs: this.fb.array([]),
                width: this.fb.control(100, {
                    validators: [ Validators.required ],
                }),
                autoWidth: [ false ],
                frame: [ 'all' ],
                grid: [ 'all' ],
                striping: [ 'none' ],
                rotate: [ false ],
                header: [ true ],
                footer: [ false ],
                format: [ 'psv' ],
                separator: [ '|' ],
            });
    }

    onColumnsChange() {
        const columns$ = this.fm.controlChanges<number>('tableConfig', 'columns');
        columns$.pipe(
            filter(ctrl => ctrl.valid),
            map(ctrl => [ ctrl.value, this.colArray.length ]),
            filter(([ cols, controls ]) => cols > 0 && cols !== controls),
        ).subscribe(([ cols, controls ]) => {
            const delta = cols - controls;
            if (delta > 0) {
                this.addColumns(delta);
            } else if (delta < 0) {
                this.removeColumns(-delta);
            }
        });
    }

    onFormatChange() {
        this.fm.valueChanges<string>('tableConfig', 'format')
            .subscribe(format => {
                let separator: string;
                switch (format) {
                    case 'psv':
                        separator = '|';
                        break;
                    case 'csv':
                        separator = ',';
                        break;
                    case 'dsv':
                        separator = ':';
                        break;
                    case 'tsv':
                        separator = '\\t';
                        break;
                    default:
                        throw new Error('Invalid format: ' + format);
                }
                this.fm.patchValue('tableConfig', { separator });
            });
    }

    onFormValueChange() {
        this.onColumnsChange();
        this.onFormatChange();
    }

    close(isOk: boolean) {
        if (isOk) {
            const data = this.fm.getControl('tableConfig')?.rawValue;
            if (data) {
                this.docEditorSvc.executeCommand({ kind: 'table', config: data });
            }
        }
        this.dialogRef.close();
    }

    constructor(
        @Inject(DocEditorServiceToken) private docEditorSvc: DocEditorService,
        public dialogRef: MatDialogRef<TableConfigComponent>,
        private fb: FormBuilder,
        private fm: NgFormsManager<DocEditorModels>) {
        this.initForm();
    }

    ngOnInit(): void {
        this.fm.upsert('tableConfig', this.tableConfigForm);
        this.onFormValueChange();
        this.fm.patchValue('tableConfig', { columns: 1 });
    }

    ngOnDestroy(): void {
        this.fm.destroy('tableConfig');
    }

}
