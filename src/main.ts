
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';
import { enableProdMode } from '@angular/core';

// For React
import './main.tsx';

// Uncomment this line for production builds
// enableProdMode();

// Bootstrap Angular
platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
