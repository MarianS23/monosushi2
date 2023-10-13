import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';

import { AdminDiscountComponent } from './admin-discount/admin-discount.component';
import { AdminCategoryComponent } from './admin-category/admin-category.component';
import { AdminDeliveryComponent } from './admin-delivery/admin-delivery.component';
import { AdminProductComponent } from './admin-product/admin-product.component';
import { SharedModule } from '../shared/modules/shared.module';



@NgModule({
  declarations: [
    AdminComponent,
    AdminDiscountComponent,
    AdminCategoryComponent,
    AdminDeliveryComponent,
    AdminProductComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule
  ]
})
export class AdminModule { }
