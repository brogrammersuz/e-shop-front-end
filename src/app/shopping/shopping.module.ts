import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { CheckOutComponent } from '@shopping/components/check-out/check-out.component';
import { MyOrdersComponent } from '@shopping/components/my-orders/my-orders.component';
import { OrderDetailsComponent } from '@shopping/components/order-details/order-details.component';
import { OrderSuccessComponent } from '@shopping/components/order-success/order-success.component';
import { ProductFilterComponent } from '@shopping/components/product-filter/product-filter.component';
import { ProductsComponent } from '@shopping/components/products/products.component';
import { ShippingFormComponent } from '@shopping/components/shipping-form/shipping-form.component';
import { ShoppingCartSummaryComponent } from '@shopping/components/shopping-cart-summary/shopping-cart-summary.component';
import { ShoppingCartComponent } from '@shopping/components/shopping-cart/shopping-cart.component';
import { CategoryService } from '@shopping/services/category.service';
import { OrderService } from '@shopping/services/order.service';
import { ProductService } from '@shopping/services/product.service';
import { ShoppingCartService } from '@shopping/services/shopping-cart.service';
import { FilerByAlphabeticOrderPipe } from '@shopping/pipes/filer-by-alphabetic-order.pipe';

@NgModule({
  imports: [SharedModule],
  declarations: [
    CheckOutComponent,
    MyOrdersComponent,
    OrderDetailsComponent,
    OrderSuccessComponent,
    ProductFilterComponent,
    ProductsComponent,
    ShippingFormComponent,
    ShoppingCartComponent,
    ShoppingCartSummaryComponent,
    FilerByAlphabeticOrderPipe
  ],
  providers: [
    CategoryService,
    OrderService,
    ProductService,
    ShoppingCartService
  ]
})
export class ShoppingModule {}
