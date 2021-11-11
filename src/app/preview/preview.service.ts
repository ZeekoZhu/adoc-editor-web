import { Injectable } from '@angular/core';
import { AdocService } from '@app/services/adoc/adoc.service';
import { Observable, Subject } from 'rxjs';
import { shareReplay, switchMap } from 'rxjs/operators';

@Injectable({
    providedIn: 'root',
})
export class PreviewService {
    constructor(private adocService: AdocService) {
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
