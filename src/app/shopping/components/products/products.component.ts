import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '@shopping/models/product';
import { ShoppingCart } from '@shopping/models/shopping-cart';
import { ProductService } from '@shopping/services/product.service';
import { ShoppingCartService } from '@shopping/services/shopping-cart.service';
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  category: string;
  shoppingCart: ShoppingCart = null;

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private shoppingCartService: ShoppingCartService
  ) {
    this.populateProducts();
  }

  private populateProducts() {
    this.productService
      .getAllProducts()
      .switchMap((products: Product[]) => {
        this.products = products;
        return this.route.queryParamMap;
      })
      .subscribe(params => {
        this.category = params.get('category');
        this.applyFilter();
      });
  }

  private applyFilter() {
    this.filteredProducts = this.category
      ? this.products.filter(p => p.category === this.category)
      : this.products;
  }

  async ngOnInit() {
    if (this.shoppingCartService.currentCart) {
      this.shoppingCart = this.shoppingCartService.currentCart;
    } else if (this.shoppingCartService.cartExists()) {
      this.shoppingCart = await this.shoppingCartService.getCart();
    }
  }

  reassignCart(cart: ShoppingCart) {
    this.shoppingCart = cart;
  }
}
