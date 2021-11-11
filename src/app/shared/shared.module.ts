import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TranslateModule } from '@ngx-translate/core';

import { PageNotFoundComponent } from './components/';
import { FormsModule } from '@angular/forms';
import { SafeDomPipe } from './pipes/safe-dom.pipe';

@NgModule({
  declarations: [ PageNotFoundComponent, SafeDomPipe ],
  imports: [ CommonModule, TranslateModule, FormsModule ],
    exports: [ TranslateModule, FormsModule, SafeDomPipe ],
})
export class SharedModule {
}
