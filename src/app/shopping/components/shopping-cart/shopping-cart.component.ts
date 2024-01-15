import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ShoppingCart } from '@shopping/models/shopping-cart';
import { ShoppingCartService } from '@shopping/services/shopping-cart.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {
  cart: ShoppingCart = null;

  constructor(
    public shoppingCartService: ShoppingCartService,
    private router: Router
  ) {}

  async ngOnInit() {
    if (this.shoppingCartService.currentCart) {
      this.cart = this.shoppingCartService.currentCart;
    } else if (this.shoppingCartService.cartExists()) {
      this.cart = await this.shoppingCartService.getCart();
    }
  }

  async clearCart() {
    await this.shoppingCartService.clearCart();
  }

  checkout() {
    this.router.navigate(['/check-out']);
  }
}
