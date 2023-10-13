import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/modules/shared.module';
import { DiscountComponent } from './discount.component';
import { DiscountInfoComponent } from 'src/app/components/discount-info/discount-info.component';
import { DiscountRoutingModule } from './discount-routing.module';




@NgModule({
  declarations: [
    DiscountComponent,
    DiscountInfoComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    DiscountRoutingModule
  ]
})
export class DiscountModule { }
