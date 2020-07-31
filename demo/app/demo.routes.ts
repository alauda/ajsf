import { Route } from '@angular/router';

import { DemoComponent } from './demo.component';

export const routes: Route[] = [
  { path: '', pathMatch: 'full', component: DemoComponent },
  {
    path: 'custom',
    loadChildren: () =>
      import('./custom/custom.module').then((M) => M.CustomModule),
  },
];
