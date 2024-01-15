import { AbstractControl, ValidationErrors } from '@angular/forms';

export class MinPriceValidators {

    static minPrice(control: AbstractControl): ValidationErrors | null {
        if ((control.value as number) < 0) {
            return {priceIsNegative: true};
        }

        return null;
    }
}
