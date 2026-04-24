import { Routes } from '@angular/router';
import { HomeComponent } from './views/home/home.component';
import { SellerComponent } from './views/seller/seller.component';
import { SellerAccountComponent } from './views/seller-account/seller-account.component';
import { authGuard } from './auth.guard';
import { SellerAddProductComponent } from './views/seller-add-product/seller-add-product.component';
import { SellerUpdateProductComponent } from './views/seller-update-product/seller-update-product.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'seller', component: SellerComponent },
  {
    path: 'seller-account',
    component: SellerAccountComponent,
    canActivate: [authGuard],
  },
  {
    path: 'seller-add-product',
    component: SellerAddProductComponent,
    canActivate: [authGuard],
  },
  {
    path: 'seller-update-product/:id',
    component: SellerUpdateProductComponent,
    canActivate: [authGuard],
  },
];
