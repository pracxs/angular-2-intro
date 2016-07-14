/* Copyright (C) 2016 Pracxs Net & ITCE - All Rights Reserved
 * You may use, distribute and modify this code under the
 * terms of the Prometheus courses license.
 *
 * You should have received a copy of the Prometheus courses
 * license.If not, please write to: prometheus@pracxs.com
 * or to prometheus@itce.com
 */

import {provide, Directive, forwardRef} from '@angular/core';
import {Control, NG_VALIDATORS} from '@angular/common';

function validateEmailFactory() {
  return (c: Control) => {
    let EMAIL_REGEXP = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/img;

    return !c.value || EMAIL_REGEXP.test(c.value) ? null : {
      email: {
        valid: false
      }
    };
  };
}

@Directive({
  selector: '[email][ngControl],[email][ngModel],[email][ngFormControl]',
  providers: [
    provide(NG_VALIDATORS, {
      useExisting: forwardRef(() => EmailValidator),
      multi: true
    })
  ]
})
export class EmailValidator {

  validator: Function;

  constructor() {
    this.validator = validateEmailFactory();
  }

  validate(c: Control) {
    return this.validator(c);
  }
}