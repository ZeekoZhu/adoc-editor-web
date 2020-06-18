import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AppConfig } from '../environments/environment';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: [ './app.component.less' ],
})
export class AppComponent {
    constructor(
        private translate: TranslateService,
    ) {
        translate.setDefaultLang('en');
        console.log('AppConfig', AppConfig);
    }
}
