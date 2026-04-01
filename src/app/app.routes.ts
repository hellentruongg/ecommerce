import { Routes } from '@angular/router';
import { HomeComponent } from './views/home/home.component';
import { SellerComponent } from './views/seller/seller.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'seller', component: SellerComponent },
];
