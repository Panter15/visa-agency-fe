// Runs after `npm run build`. Static hosts serve real files, so give each app route its own copy of index.html:
// /privacidad answers 200, and any unknown URL gets 404.html (still the Angular app, which shows the NotFound page)
// with a real 404 status, instead of a "soft 404" that search engines index.
// Keep ROUTES in sync with src/app/app.routes.ts.
import { copyFileSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';

const ROUTES = ['privacidad', 'terminos', 'reembolsos'];
const dist = 'dist/visa-agency/browser';
const index = join(dist, 'index.html');

for (const route of ROUTES) {
  mkdirSync(join(dist, route), { recursive: true });
  copyFileSync(index, join(dist, route, 'index.html'));
}
copyFileSync(index, join(dist, '404.html'));
// Open-source license notices of the bundled libraries (MIT/Apache require shipping them), served at /3rdpartylicenses.txt.
copyFileSync('dist/visa-agency/3rdpartylicenses.txt', join(dist, '3rdpartylicenses.txt'));
console.log(`spa-routes: ${ROUTES.length} routes + 404.html + 3rdpartylicenses.txt`);
