import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CabinetComponent } from './cabinet.component';
import { CabinetOrdersComponent } from './cabinet-orders/cabinet-orders.component';
import { CabinetPersInfoComponent } from './cabinet-pers-info/cabinet-pers-info.component';
import { CabinetPasswordComponent } from './cabinet-password/cabinet-password.component';






const routes: Routes = [
  {
    path: '', component: CabinetComponent, children: [
      { path: 'cabinet-orders', component: CabinetOrdersComponent },
      { path: 'cabinet-pers-info', component: CabinetPersInfoComponent },
      { path: 'cabinet-password', component: CabinetPasswordComponent },
      { path: '', pathMatch: 'full', redirectTo: 'cabinet-pers-info' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CabinetRoutingModule { }