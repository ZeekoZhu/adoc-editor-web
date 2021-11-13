import { Injectable } from '@angular/core';
import { AdocAsyncConverterService } from '@app/services/adoc/adoc-async-converter.service';
import { Observable, Subject } from 'rxjs';
import { shareReplay, switchMap } from 'rxjs/operators';

@Injectable({
    providedIn: 'root',
})
export class PreviewService {
    constructor(private adocService: AdocAsyncConverterService) {
        this.renderedContent$ = this._$preview.pipe(
            switchMap(it => this.adocService.convert(it)),
            shareReplay(1),
        );
    }

    private _$preview = new Subject<string>();
    renderedContent$: Observable<string>;

    scheduleRender(content: string) {
        console.log('render preview');
        this._$preview.next(content);
    }
}
