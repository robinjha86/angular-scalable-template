
import { GlobalConfig } from 'ngx-toastr';

export const toasterDefaults: GlobalConfig = {
  maxOpened: 0,
  includeTitleDuplicates: true,
  autoDismiss: false,
  iconClasses: {
    error: 'toast-error',
    info: 'toast-info',
    success: 'toast-success',
    warning: 'toast-warning',
  },
  newestOnTop: true,
  preventDuplicates: true,
  countDuplicates: true,
  resetTimeoutOnDuplicate: true,
  // includeTitleDuplicates: false,
  // toastComponent: Toast
  closeButton: false,
  timeOut: 10000,
  extendedTimeOut: 1000,
  disableTimeOut: false,
  easing: 'ease-in',
  easeTime: 300,
  enableHtml: false,
  progressBar: true,
  progressAnimation: 'decreasing',
  toastClass: 'ngx-toastr',
  positionClass: 'toast-bottom-right',
  titleClass: 'toast-title',
  messageClass: 'toast-message',
  tapToDismiss: true,
  onActivateTick: false,

};
