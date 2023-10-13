import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CabinetPersInfoComponent } from './cabinet-pers-info/cabinet-pers-info.component';
import { CabinetOrdersComponent } from './cabinet-orders/cabinet-orders.component';
import { CabinetPasswordComponent } from './cabinet-password/cabinet-password.component';
import { CabinetComponent } from './cabinet.component';

import { CabinetRoutingModule } from './cabinet-routing.module';
import { SharedModule } from 'src/app/shared/modules/shared.module';



@NgModule({
  declarations: [
    CabinetComponent,
    CabinetPersInfoComponent,
    CabinetOrdersComponent,
    CabinetPasswordComponent
  ],
  imports: [
    CommonModule,
    CabinetRoutingModule,
    
    SharedModule
  ]
})
export class CabinetModule { }
