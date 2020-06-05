import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { DocEditorService } from '@app/doc-editor/store';
import { asyncScheduler, fromEvent, Subject } from 'rxjs';
import { map, takeUntil, throttleTime } from 'rxjs/operators';
import * as ace from 'ace-builds';
import 'ace-builds/webpack-resolver';

ace.config.setModuleUrl('ace/mode/asciidoctor',
    require('file-loader?esModule=false!./asciidoctor-mode.js'));

import { addSnippets } from '@app/doc-editor/components/adoc-editor/snippets';
import { commandHandler } from '@app/doc-editor/toolbar-command-handlers';
import { bindCommands } from '@app/doc-editor/components/adoc-editor/commands';

@Component({
    selector: 'app-adoc-editor',
    templateUrl: './adoc-editor.component.html',
    styleUrls: [ './adoc-editor.component.less' ],
})
export class AdocEditorComponent implements OnInit, AfterViewInit, OnDestroy {
    @ViewChild('editorContainer') editorContainer: ElementRef<HTMLDivElement>;
    private unSub = new Subject();
    private editor: ace.Ace.Editor;

    bindOnChange() {
        const changes$ = fromEvent(this.editor, 'change');
        changes$.pipe(
            throttleTime(100, asyncScheduler, {
                leading: true, trailing: true,
            }),
            map(() => this.editor.getValue()),
            takeUntil(this.unSub),
        ).subscribe(content => {
            this.docEditorSvc.setContent(content);
        });
    }

    bindToolbarCommand() {
        this.docEditorSvc.adocEditorCommands$.subscribe(cmd => commandHandler(cmd, this.editor));
    }

    constructor(private docEditorSvc: DocEditorService) {
    }

    ngOnInit(): void {
    }

    ngAfterViewInit(): void {
        this.editor = ace.edit(this.editorContainer.nativeElement, {
            mode: 'ace/mode/asciidoctor',
            fontSize: 16,
            showLineNumbers: false,
        });
        this.bindOnChange();
        this.editor.session.setUseWrapMode(true);
        addSnippets(this.editor);
        bindCommands(this.editor);
        this.bindToolbarCommand();
        // @ts-ignore
    }

    ngOnDestroy(): void {
        this.unSub.next();
        this.unSub.complete();
    }
}
