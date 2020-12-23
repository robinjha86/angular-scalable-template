import { CommonModule } from '@angular/common';
import {
    ModuleWithProviders, NgModule, Optional, SkipSelf
} from '@angular/core';
import { RouterModule } from '@angular/router';

import { HelperService } from '@shared/services/helper.service';
import { ToastrModule } from 'ngx-toastr';
import {
    FooterComponent, HeaderComponent, SidebarComponent, SpinnerComponent
} from './components';
import { EnsureModuleLoadedOnceGuard } from './ensure-module-loaded-once.guard';
import { httpInterceptorProviders } from './interceptors/index';
import {
    ErrorLoggerService, HttpErrorHandlerService, toasterDefaults
} from './utils';

const COMPONENTS = [FooterComponent, HeaderComponent, SidebarComponent, SpinnerComponent];

@NgModule({
  imports: [CommonModule, RouterModule, ToastrModule.forRoot(toasterDefaults)],
  exports: [...COMPONENTS],
  declarations: [...COMPONENTS],
  providers: [HelperService, ...httpInterceptorProviders, ErrorLoggerService, HttpErrorHandlerService]
})
export class CoreModule extends EnsureModuleLoadedOnceGuard {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    super(parentModule);
  }


  static forRoot(): ModuleWithProviders<CoreModule> {
    return {
      ngModule: CoreModule,
      providers: []
    };
  }
}
