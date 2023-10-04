import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { AboutUsComponent } from './pages/about-us/about-us.component';
import { AuthorizationComponent } from './pages/authorization/authorization.component';
import { CabinetComponent } from './pages/cabinet/cabinet.component';
import { DeliveryAndPaymentComponent } from './pages/delivery-and-payment/delivery-and-payment.component';
import { HomeComponent } from './pages/home/home.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ModalBasketComponent } from './components/modal-basket/modal-basket.component';
import { ModalCallbackComponent } from './components/modal-callback/modal-callback.component';
import { ModalSigninComponent } from './components/modal-signin/modal-signin.component';
import { DiscountComponent } from './pages/discount/discount.component';
import { ProductComponent } from './pages/product/product.component';
import { AdminComponent } from './admin/admin.component';
import { AdminDiscountComponent } from './admin/admin-discount/admin-discount.component';
import { AdminCategoryComponent } from './admin/admin-category/admin-category.component';
import { AdminDeliveryComponent } from './admin/admin-delivery/admin-delivery.component';
import { AdminProductComponent } from './admin/admin-product/admin-product.component';
import { ItemCardComponent } from './components/item-card/item-card.component';
import { ProductInfoComponent } from './components/product-info/product-info.component';
import { DiscountInfoComponent } from './components/discount-info/discount-info.component';

import { ToastrModule, ToastNoAnimation, ToastNoAnimationModule } from 'ngx-toastr';

import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideStorage, getStorage } from '@angular/fire/storage';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { provideAuth, getAuth } from '@angular/fire/auth';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { CabinetPersInfoComponent } from './pages/cabinet/cabinet-pers-info/cabinet-pers-info.component';
import { CabinetOrdersComponent } from './pages/cabinet/cabinet-orders/cabinet-orders.component';
import { CabinetPasswordComponent } from './pages/cabinet/cabinet-password/cabinet-password.component';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    AboutUsComponent,
    AuthorizationComponent,
    CabinetComponent,
    DeliveryAndPaymentComponent,
    HomeComponent,
    ModalBasketComponent,
    ModalCallbackComponent,
    ModalSigninComponent,
    DiscountComponent,
    ProductComponent,
    AdminComponent,
    AdminDiscountComponent,
    AdminCategoryComponent,
    AdminDeliveryComponent,
    AdminProductComponent,
    ItemCardComponent,
    ProductInfoComponent,
    DiscountInfoComponent,
    CabinetPersInfoComponent,
    CabinetOrdersComponent,
    CabinetPasswordComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideStorage(() => getStorage()),
    provideFirestore(() => getFirestore()),
    provideAuth(() => getAuth()),
    ToastNoAnimationModule.forRoot(),
    BrowserAnimationsModule,
    MatDialogModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
