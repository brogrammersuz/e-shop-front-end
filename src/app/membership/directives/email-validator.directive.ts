import { Directive } from '@angular/core';
import {
  AbstractControl,
  NG_VALIDATORS,
  Validator,
  ValidatorFn
} from '@angular/forms';

@Directive({
  selector: '[appEmailValidator]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: EmailValidatorDirective,
      multi: true
    }
  ]
})
export class EmailValidatorDirective implements Validator {
  validate(control: AbstractControl): { [key: string]: any } {
    return emailValidator()(control);
  }
}

export function emailValidator(): ValidatorFn {
  const emailRe: RegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return (control: AbstractControl): { [key: string]: any } => {
    const email = emailRe.test(
      control.value ? control.value.toLowerCase() : ''
    );
    return !email ? { notValidEmail: { value: control.value } } : null;
  };
}
