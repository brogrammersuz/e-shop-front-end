import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '@shopping/models/product';
import { ShoppingCart } from '@shopping/models/shopping-cart';
import { ShoppingCartItem } from '@shopping/models/shopping-cart-item';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {
  private url = 'api/shopping-cart/';
  private _currentCart: ShoppingCart = null;

  constructor(private http: HttpClient) {}

  get currentCart() {
    return this._currentCart;
  }

  set currentCart(cart) {
    this._currentCart = new ShoppingCart(cart.id, cart.items);
  }

  cartExists() {
    return localStorage.getItem('cartId');
  }

  async getCart(): Promise<any> {
    const cartId = localStorage.getItem('cartId');
    let cart = null;
    if (cartId) {
      cart = await this.getCartFromAPI(cartId);
    } else {
      cart = await this.createCart();
      localStorage.setItem('cartId', cart['id']);
    }

    this.currentCart = cart;
    return this.currentCart;
  }

  async addToCart(product: Product) {
    return await this.updateItemQuantity(product, 1);
  }

  async removeFromCart(product: Product) {
    return await this.updateItemQuantity(product, -1);
  }

  async clearCart() {
    if (this.currentCart) {
      this.currentCart = await this.clearShoppingCart(this.currentCart.id);
    } else {
      const cart = await this.getCart();
      this.currentCart = await this.clearShoppingCart(cart.id);
    }
  }

  private async clearShoppingCart(cartId): Promise<any> {
    return await this.http.delete(this.url + cartId + '/clear').toPromise();
  }

  private async getShoppingCartItem(cartId: any, itemId: string): Promise<any> {
    return await this.http
      .get(this.url + cartId + '/items/' + itemId)
      .toPromise();
  }

  private async createShoppingCartItem(cartId: any, cartItem): Promise<any> {
    return await this.http
      .post(this.url + cartId + '/items', cartItem)
      .toPromise();
  }
  private async updateShoppingCartItem(
    cartId: any,
    productId: string,
    item: ShoppingCartItem
  ) {
    return await this.http
      .put(this.url + cartId + '/items/' + productId, item)
      .toPromise();
  }

  private async deleteShoppingCartItem(
    cartId: any,
    productId: string
  ): Promise<any> {
    return await this.http
      .delete(this.url + cartId + '/items/' + productId)
      .toPromise();
  }

  private async createCart() {
    return await this.http.post(this.url, {}).toPromise();
  }

  private async getCartFromAPI(cartId) {
    return await this.http.get(this.url + cartId).toPromise();
  }

  private async updateItemQuantity(product: Product, change: number) {
    let cart = null;
    if (this.currentCart) {
      const cartItem = await this.getShoppingCartItem(
        this.currentCart.id,
        product.id
      );
      if (cartItem) {
        if (change == -1 && cartItem.quantity <= 1) {
          cart = await this.deleteShoppingCartItem(
            this.currentCart.id,
            product.id
          );
        } else {
          cartItem.quantity = cartItem.quantity + change;
          cart = await this.updateShoppingCartItem(
            this.currentCart.id,
            product.id,
            cartItem
          );
        }
      } else {
        cart = await this.createShoppingCartItem(this.currentCart.id, {
          quantity: 1,
          productId: product.id
        });
      }
    } else {
      await this.getCart();
      const cartItem = await this.getShoppingCartItem(
        this.currentCart.id,
        product.id
      );
      if (cartItem) {
        if (change == -1 && cartItem.quantity <= 1) {
          cart = await this.deleteShoppingCartItem(
            this.currentCart.id,
            product.id
          );
        } else {
          cartItem.quantity = cartItem.quantity + change;
          cart = await this.updateShoppingCartItem(
            this.currentCart.id,
            product.id,
            cartItem
          );
        }
      } else {
        cart = await this.createShoppingCartItem(this.currentCart.id, {
          quantity: 1,
          productId: product.id
        });
      }
    }

    this.currentCart = cart;
    return this.currentCart;
  }
}
