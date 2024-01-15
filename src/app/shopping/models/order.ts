import { User } from '@membership/models/user';
import { ShoppingCart } from './shopping-cart';
import { ShoppingCartItem } from './shopping-cart-item';

export class Order {
  id: number;
  datePlaced: Date;
  items: ShoppingCartItem[] = [];
  user: User;
  constructor(
    public userId: number,
    public shipping: any,
    shoppingCart: ShoppingCart
  ) {
    for (const item of shoppingCart.items) {
      this.items.push(item);
    }
  }

  getTotalPrice() {
    let total = 0;
    this.items.forEach(item => {
      total += item.quantity * item.product.price;
    });

    return total;
  }
}
