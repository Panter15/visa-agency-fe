import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';

// Font preview: ?font=lora | jakarta | original switches the font option (styles.sass). Default: Ysabeau Office.
// Here and not in an inline <script>, because the Content-Security-Policy only allows the site's own script files.
const font = new URLSearchParams(location.search).get('font');
if (font === 'lora' || font === 'jakarta' || font === 'original') document.documentElement.dataset['font'] = font;

bootstrapApplication(App, appConfig)
  .catch((err) => console.error(err));
