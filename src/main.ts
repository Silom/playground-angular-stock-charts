/*
 *  Protractor support is deprecated in Angular.
 *  Protractor is used in this example for compatibility with Angular documentation tools.
 */
import {
  bootstrapApplication,
  provideProtractorTestingSupport,
} from '@angular/platform-browser'
import { provideHttpClient } from '@angular/common/http'
import { AppComponent } from './app/app.component'

bootstrapApplication(AppComponent, {
  providers: [provideProtractorTestingSupport(), provideHttpClient()],
}).catch((err) => console.error(err))
