import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { BookfinderAppModule } from './app/bookfinder-app.module';


platformBrowserDynamic().bootstrapModule(BookfinderAppModule)
  .catch(err => console.error(err));
