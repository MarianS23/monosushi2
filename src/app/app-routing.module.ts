import { NgModule } from '@angular/core';
import { PreloadAllModules, PreloadingStrategy, RouterModule, Routes } from '@angular/router';
import { ProductComponent } from './pages/product/product.component';
import { ProductInfoComponent } from './components/product-info/product-info.component';
import { AboutUsComponent } from './pages/about-us/about-us.component';
import { DeliveryAndPaymentComponent } from './pages/delivery-and-payment/delivery-and-payment.component';
import { HomeComponent } from './pages/home/home.component';
import { ModalBasketComponent } from './components/modal-basket/modal-basket.component';
import { ModalSigninComponent } from './components/modal-signin/modal-signin.component';
import { authorizationGuard } from './shared/guards/authorization.guard';



const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'about', component: AboutUsComponent },
  { path: 'delivery', component: DeliveryAndPaymentComponent },
  {
    path:'discount',
    loadChildren: () => import('./pages/discount/discount.module').then(m => m.DiscountModule)
  },
  { path: 'product/:category', component: ProductComponent },
  { path: 'product/:category/:id', component: ProductInfoComponent },
  { path: 'basket', component: ModalBasketComponent },
  { path: 'signin', component: ModalSigninComponent },
  {
    path: 'cabinet',
    loadChildren: () => import('./pages/cabinet/cabinet.module').then(m => m.CabinetModule)
  },
  {
    path: 'admin',
    canActivate: [authorizationGuard],
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    preloadingStrategy: PreloadAllModules,
    scrollPositionRestoration: 'enabled'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }


//{ scrollPositionRestoration: 'enabled' } the page scrolled back to the top when routes