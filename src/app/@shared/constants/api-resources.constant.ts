import { environment } from '../../../environments/environment';

const createUrl = (actionName: string): string => `${environment.apiHost}${actionName}`;

const createAuthUrl = (actionName: string): string => `${environment.apiHost}auth/${actionName}`;

export const appApiResources = {
  baseUrl: environment.apiHost,
  staticUploadsPath: `${environment.apiHost}Uploads/`,
  login: createAuthUrl('token'),
  register: createAuthUrl('register'),
  getProfile: createUrl('profile'),
  logError: '',
};
