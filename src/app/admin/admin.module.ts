import { AdminOrdersComponent } from '@admin/components/admin-orders/admin-orders.component';
import { AdminProductsComponent } from '@admin/components/admin-products/admin-products.component';
import { AdminAuthGuardService } from '@admin/services/admin-auth-guard.service';
import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { DataTableModule } from 'angular5-data-table';
import { ProductFormComponent } from '@admin/components/product-form/product-form.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    SharedModule,
    DataTableModule.forRoot(),
    ReactiveFormsModule
  ],
  declarations: [
    AdminProductsComponent,
    AdminOrdersComponent,
    ProductFormComponent,
    ProductFormComponent,
  ],
  providers: [
    AdminAuthGuardService,
  ]
})
export class AdminModule { }
