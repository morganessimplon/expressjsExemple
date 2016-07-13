import { provideRouter, RouterConfig }  from '@angular/router';

import { ClientDetailComponent } from './client/client.component';
import { ArticleDetailComponent } from './article/article.component';

export const routes: RouterConfig = [
  {
    path: '',
    redirectTo: '/client',
    pathMatch: 'full'
  },
  {
    path: 'client',
    component: ClientDetailComponent
  },
  {
    path: '',
    redirectTo: '/article',
    pathMatch: 'full'
  },
  {
    path: 'article',
    component: ArticleDetailComponent
  }
];

export const APP_ROUTER_PROVIDERS = [
  provideRouter(routes)
];
