import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, Inject, OnInit } from '@angular/core';
import { AdocEditorCommand } from '@app/doc-editor/adoc-editor-command';
import { EditorQuery, EditorService, DocEditorServiceToken, EditorStore } from '@app/doc-editor/store';
import { AdocService } from '@app/services/adoc/adoc.service';
import { filter } from 'rxjs/operators';
import { PreviewService } from '@app/preview/preview.service';

@Component({
    selector: 'app-editor-panel',
    templateUrl: './editor-panel.component.html',
    styleUrls: [ './editor-panel.component.less' ],
    animations: [
        trigger('previewOpenClose', [
            state('open', style({
                opacity: 1,
                background: 'white',
            })),
            state('closed', style({
                opacity: 0,
                background: 'rgba(255,255,255,0)',
                display: 'none',
            })),
            transition('open => closed', [
                animate('0.25s'),
                animate('0s', style({
                    display: 'none',
                })),
            ]),
            transition('closed => open', [
                style({ display: '*' }),
                animate('0.25s'),
            ]),
        ]),
        trigger('previewContainer', [
            state('open', style({
                display: '*',
            })),
            state('closed', style({
                display: 'none',
            })),
            transition('open => closed', [
                animate('0.25s'),
            ]),
            transition('closed => open', [
                animate(0),
            ]),
        ]),
    ],
})
export class EditorPanelComponent implements OnInit {

    constructor(
        @Inject(AdocService) private adocSvc: AdocService,
        @Inject(DocEditorServiceToken) private docEditorSvc: EditorService,
        private previewSvc: PreviewService,
        private editorStore: EditorStore,
        private editorQuery: EditorQuery) { }

    showPreview$ = this.editorQuery.showPreview$;

    executeToolbarCommand(cmd: AdocEditorCommand) {
        this.docEditorSvc.executeCommand(cmd);
    }

    togglePreview() {
        this.editorStore.togglePreview();
        this.previewSvc.scheduleRender(this.editorQuery.content);
    }

    ngOnInit(): void {
        this.showPreview$.pipe(
            filter(x => !x),
        ).subscribe(() => this.docEditorSvc.executeCommand({ kind: 'focus' }));
    }

}
