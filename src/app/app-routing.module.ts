import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from '@membership/components/login/login.component';
import { RegisterComponent } from '@membership/components/register/register.component';
import { AuthGuardService } from '@shared/services/auth-guard.service';
import { AdminOrdersComponent } from '@admin/components/admin-orders/admin-orders.component';
import { AdminProductsComponent } from '@admin/components/admin-products/admin-products.component';
import { ProductFormComponent } from './admin/components/product-form/product-form.component';
import { AdminAuthGuardService } from '@admin/services/admin-auth-guard.service';
import { CheckOutComponent } from '@shopping/components/check-out/check-out.component';
import { MyOrdersComponent } from '@shopping/components/my-orders/my-orders.component';
import { OrderDetailsComponent } from '@shopping/components/order-details/order-details.component';
import { OrderSuccessComponent } from '@shopping/components/order-success/order-success.component';
import { ProductsComponent } from '@shopping/components/products/products.component';
import { ShoppingCartComponent } from '@shopping/components/shopping-cart/shopping-cart.component';

export const routes: Routes = [
  { path: '', component: ProductsComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'shopping-cart', component: ShoppingCartComponent },

  {
    path: 'check-out',
    component: CheckOutComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'order-success/:id',
    component: OrderSuccessComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'my/orders',
    component: MyOrdersComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'admin/products/new',
    component: ProductFormComponent,
    canActivate: [AuthGuardService, AdminAuthGuardService]
  },
  {
    path: 'admin/products/:id',
    component: ProductFormComponent,
    canActivate: [AuthGuardService, AdminAuthGuardService]
  },
  {
    path: 'admin/products',
    component: AdminProductsComponent,
    canActivate: [AuthGuardService, AdminAuthGuardService]
  },
  {
    path: 'admin/orders',
    component: AdminOrdersComponent,
    canActivate: [AuthGuardService, AdminAuthGuardService]
  },
  {
    path: 'order-details/:id',
    component: OrderDetailsComponent,
    canActivate: [AuthGuardService]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
