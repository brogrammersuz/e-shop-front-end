import { Pipe, PipeTransform } from '@angular/core';
import { ShoppingCartItem } from '@shopping/models/shopping-cart-item';

@Pipe({
  name: 'filerByAlphabeticOrder'
})
export class FilerByAlphabeticOrderPipe implements PipeTransform {

  transform(items: ShoppingCartItem[], args?: any): any {
    if (!items) {
      return items;
    }

    return items.sort((a: ShoppingCartItem, b: ShoppingCartItem) => {
        if (a.product.title < b.product.title) { return -1; }
        if (a.product.title > b.product.title) { return 1; }
        return 0;
    });

  }

}
