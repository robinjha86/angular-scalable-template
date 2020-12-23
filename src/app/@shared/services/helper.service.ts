import { Injectable } from '@angular/core';

import { environment } from '../../../environments/environment';

@Injectable()
export class HelperService {
  env: string;

  constructor() {
    this.env = environment.env;
  }

  isProdEnv(): boolean {
    return this.env.toLocaleLowerCase() === 'prod' || this.env.toLocaleLowerCase() === 'production' ? true : false;
  }
  isStageEnv(): boolean {
    return this.env.toLocaleLowerCase() === 'stage' || this.env.toLocaleLowerCase() === 'staging' ? true : false;
  }
  isDevEnv(): boolean {
    return this.env.toLocaleLowerCase() === 'dev' || this.env.toLocaleLowerCase() === 'development' ? true : false;
  }

}
