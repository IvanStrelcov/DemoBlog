import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BlogComponent }        from './blog';
import { NoContentComponent }   from './no-content';
import { RedirectComponent }    from './redirect';

const Routes: Routes = [
  { path: '', redirectTo: 'blog', pathMatch: 'full' },
  { path: 'blog', component: BlogComponent, data: { title: 'Blog'} },
  { path: 'redirect', component: RedirectComponent },
  { path: '**', component: NoContentComponent }
];

export const AppRouting: ModuleWithProviders = RouterModule.forRoot(Routes);
