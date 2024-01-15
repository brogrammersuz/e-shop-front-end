import { Component, OnInit } from '@angular/core';
import { ShoppingCart } from '@shopping/models/shopping-cart';
import { ShoppingCartService } from '@shopping/services/shopping-cart.service';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css']
})
export class CheckOutComponent implements OnInit {
  cart: ShoppingCart;

  constructor(private shoppingCartService: ShoppingCartService) {}

  async ngOnInit() {
    this.cart = await this.shoppingCartService.getCart();
  }
}
