import { Component, OnInit } from '@angular/core';
import { AdocService } from '@app/services/adoc/adoc.service';

@Component({
    selector: 'app-preview',
    templateUrl: './preview.component.html',
    styleUrls: [ './preview.component.less' ],
})
export class PreviewComponent implements OnInit {
    constructor(private adocService: AdocService) { }

    ngOnInit(): void {
    }

}
