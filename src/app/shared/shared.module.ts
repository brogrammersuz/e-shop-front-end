import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '@membership/services/auth.service';
import { UserService } from '@membership/services/user.service';
import { ProductCardComponent } from '@shared/components/product-card/product-card.component';
import { ProductQuantityComponent } from '@shared/components/product-quantity/product-quantity.component';
import { DebounceClickDirective } from '@shared/directives/debounce-click.directive';
import { AuthGuardService } from '@shared/services/auth-guard.service';
import { CategoryService } from '@shopping/services/category.service';
import { OrderService } from '@shopping/services/order.service';
import { ProductService } from '@shopping/services/product.service';
import { ShoppingCartService } from '@shopping/services/shopping-cart.service';
import { DataTableModule } from 'angular5-data-table';

import { RouterModule } from '@angular/router';
import { CustomFormsModule } from 'ng2-validation';

@NgModule({
  imports: [CommonModule, FormsModule, DataTableModule.forRoot(), RouterModule],
  declarations: [
    ProductCardComponent,
    ProductQuantityComponent,
    DebounceClickDirective
  ],
  exports: [
    ProductCardComponent,
    ProductQuantityComponent,
    CommonModule,
    FormsModule,
    DataTableModule,
    CustomFormsModule,
    RouterModule
  ],
  providers: [
    AuthGuardService,
    AuthService,
    UserService,
    CategoryService,
    ProductService,
    ShoppingCartService,
    OrderService
  ]
})
export class SharedModule {}
