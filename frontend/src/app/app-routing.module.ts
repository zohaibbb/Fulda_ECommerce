import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterComponent } from './signing/register/register.component';
import { LoginComponent } from './signing/login/login.component';
import { HomeComponent } from './home/home.component';
import { ProductListComponent } from './product/product-list/product-list.component';
import { ProductDetailComponent } from './product/product-detail/product-detail.component';
import { ProductCreateComponent } from './product/product-create/product-create.component';
import { WishlistComponent } from './wishlist/wishlist.component';
import { AdminapprovalComponent } from './adminapproval/adminapproval.component';
import { ForgotPasswordComponent } from './signing/forgot-password/forgot-password.component';
import { ProfileComponent } from './profile/profile.component';
import { OrdersHistoryComponent } from './orders-history/orders-history.component';


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'product-listing', component: ProductListComponent },
  { path: 'product-detail', component: ProductDetailComponent },
  { path: 'product-create', component: ProductCreateComponent },
  { path: 'wishlist', component: WishlistComponent },
  { path: 'adminapproval', component: AdminapprovalComponent },
  { path : 'forgot-password', component : ForgotPasswordComponent},
  { path: 'profile', component: ProfileComponent },
  { path: 'history', component: OrdersHistoryComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }