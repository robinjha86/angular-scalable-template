import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AstAuthComponent } from './ast-auth.component';
import { AstLoginComponent } from './ast-login/ast-login.component';

export const routes: Routes = [
  {
    path: '',
    component: AstAuthComponent,
    children: [
      {
        path: 'login',
        component: AstLoginComponent
      }
    ]
  }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AstAuthRoutingModule { }
