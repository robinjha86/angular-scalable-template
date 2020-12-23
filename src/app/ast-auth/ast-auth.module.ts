import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { AstAuthRoutingModule } from './ast-auth-routing.module';
import { AstAuthComponent } from './ast-auth.component';
import { AstLoginComponent } from './ast-login/ast-login.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    AstAuthRoutingModule,
  ],
  declarations: [AstAuthComponent, AstLoginComponent]
})
export class AstAuthModule { }
