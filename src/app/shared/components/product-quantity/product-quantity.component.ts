import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Product } from '@shopping/models/product';
import { ShoppingCartService } from '@shopping/services/shopping-cart.service';

@Component({
  selector: 'app-product-quantity',
  templateUrl: './product-quantity.component.html',
  styleUrls: ['./product-quantity.component.css']
})
export class ProductQuantityComponent implements OnInit {
  @Input('product') product: Product;
  @Input('shopping-cart') shoppingCart;
  @Output() cartChangedEvent = new EventEmitter();

  constructor(private shoppingCartService: ShoppingCartService) {}

  ngOnInit() {}

  async addToCart() {
    const cart = await this.shoppingCartService.addToCart(this.product);
    this.cartChangedEvent.emit(cart);
  }

  async removeFromCart() {
    if (this.shoppingCartService.currentCart) {
      if (this.shoppingCartService.currentCart.getQuantity(this.product) > 0) {
        const cart = await this.shoppingCartService.removeFromCart(
          this.product
        );
        this.cartChangedEvent.emit(cart);
      }
    } else {
      const card = await this.shoppingCartService.getCart();
      if (card.getQuantity(this.product) > 0) {
        const cart = await this.shoppingCartService.removeFromCart(
          this.product
        );
        this.cartChangedEvent.emit(cart);
      }
    }
  }
}
