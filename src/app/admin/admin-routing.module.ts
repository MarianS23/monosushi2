import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { AdminCategoryComponent } from './admin-category/admin-category.component';
import { AdminDiscountComponent } from './admin-discount/admin-discount.component';
import { AdminDeliveryComponent } from './admin-delivery/admin-delivery.component';
import { AdminProductComponent } from './admin-product/admin-product.component';





const routes: Routes = [
    {
        path: '', component:AdminComponent, children: [
            { path: 'admin-category', component: AdminCategoryComponent },
            { path: 'admin-discount', component: AdminDiscountComponent },
            { path: 'admin-delivery', component: AdminDeliveryComponent },
            { path: 'admin-product', component: AdminProductComponent },
            { path: '', pathMatch: 'full', redirectTo: 'admin-category' }
          ]
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
