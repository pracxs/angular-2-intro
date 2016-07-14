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