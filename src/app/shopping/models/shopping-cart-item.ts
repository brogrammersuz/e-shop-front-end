import { Product } from './product';

export class ShoppingCartItem {
  id: number;
  quantity: number;
  product: Product;

  constructor(id: number, quantity: number, product: Product) {
    this.id = id;
    this.quantity = quantity;
    this.product = new Product(
      product.id,
      product.title,
      product.price,
      product.category,
      product.imgUrl
    );
  }

  get totalPrice() {
    return this.quantity * this.product.price;
  }
}
