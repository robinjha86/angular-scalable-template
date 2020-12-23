import { NgModule } from '@angular/core';
import {
    ExtraOptions, PreloadAllModules, RouterModule, Routes
} from '@angular/router';

export const routes: Routes = [
  {
    path: 'auth',
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    loadChildren: () => import('./ast-auth/ast-auth.module').then(m => m.AstAuthModule)
  },
  {
    path: 'pages',
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    loadChildren: () => import('./pages').then(m => m.PagesModule),
    canActivate: []
  },
  { path: '', redirectTo: '/pages/dashboard', pathMatch: 'full' },
];

const config: ExtraOptions = {
  useHash: false,
  preloadingStrategy: PreloadAllModules,
  onSameUrlNavigation: 'reload'
};

@NgModule({
  imports: [RouterModule.forRoot(routes, config)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
