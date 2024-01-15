import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ShoppingCartService } from './shopping-cart.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private readonly url = '/api/order/';

  constructor(
    private shoppingCartService: ShoppingCartService,
    private http: HttpClient
  ) {}

  createOrder(order) {
    return this.http.post(this.url, order).do(() => this.call());
  }

  getOrderById(id: number) {
    return this.http.get(this.url + `${id}`);
  }

  getAllOrders() {
    return this.http.get(this.url);
  }

  getOrdersByUserId(userId: number) {
    return this.http.get(this.url + `/user/${userId}`);
  }

  private async call() {
    await this.shoppingCartService.clearCart();
  }
}
