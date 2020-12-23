/*
 * @Author: Saurabh Palatkar
 * @Date: 2020-11-15 17:34:40
 * @Last Modified by: Saurabh Palatkar
 * @Last Modified time: 2020-12-13 20:59:02
 * Features (directives, reusable component, pipes, custom reusable service) which are
 * reusable across multiple places in the app, should be part of the Shared module.
 */
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { FileUploadComponent } from './components';
import { SafePipe } from './pipes';

const ANGULAR_MODULES = [
  CommonModule,
  FormsModule
];

const THIRD_PARTY_MODULES: never[] = [];

const THIRD_PARTY_SERVICES: never[] = [];

const PIPES = [
  SafePipe,
];

const COMPONENTS = [
  FileUploadComponent,
];

@NgModule({
  imports: [...ANGULAR_MODULES, ...THIRD_PARTY_MODULES],
  declarations: [...COMPONENTS, ...PIPES],
  exports: [...COMPONENTS, ...PIPES, ...THIRD_PARTY_MODULES],
  providers: [...THIRD_PARTY_SERVICES]
})
export class SharedModule {

}



