import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Product } from '@shopping/models/product';
import { ShoppingCart } from '@shopping/models/shopping-cart';
import { ShoppingCartService } from '@shopping/services/shopping-cart.service';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnInit {
  @Input('product') product: Product;
  @Input('show-actions') showActions = true;
  @Input('shopping-cart') shoppingCart: ShoppingCart;
  @Output() cartChangedEvent = new EventEmitter();

  constructor(private shoppingCartService: ShoppingCartService) {}

  ngOnInit() {}

  async addToCart() {
    const cart = await this.shoppingCartService.addToCart(this.product);
    this.cartChangedEvent.emit(cart);
  }

  cartChanged(card: ShoppingCart) {
    this.cartChangedEvent.emit(card);
  }
}
