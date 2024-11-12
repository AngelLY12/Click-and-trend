import { Component } from '@angular/core';
import { Routes } from '@angular/router';
import { HomeLayoutComponent } from './home-layout/home-layout.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { MenLayoutComponent } from './layout/men-layout/men-layout.component';
import { WomenLayoutComponent } from './layout/women-layout/women-layout.component';
import { KidsLayoutComponent } from './layout/kids-layout/kids-layout.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { AuthGuard } from './services/guards/auth.guard';
import { ProfileSettingsComponent } from './profile-settings/profile-settings.component';
import { AccountComponent } from './profile-settings/account/account.component';
import { PaymentComponent } from './profile-settings/payment/payment.component';
import { DashboardLayoutComponent } from './dashboard/dashboard-layout/dashboard-layout.component';
import { AdminGuard } from './services/guards/admin-guard.guard';
import { AddProductComponent } from './dashboard/add-product/add-product.component';
import { EditProductComponent } from './dashboard/edit-product/edit-product.component';
import { TableComponent } from './dashboard/table/table.component';
import { UsersTableComponent } from './dashboard/users-table/users-table.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { AddressComponent } from './profile-settings/address/address.component';

export const routes: Routes = [
  {
    path:'',
    component:HomeLayoutComponent
  },
  {
    path: 'home',
    component:HomeLayoutComponent

  },
  {
    path: 'login',
    component:LoginComponent,
  },
  {
    path: 'register',
    component:RegisterComponent

  },
  {
    path: 'products-men',
    component:MenLayoutComponent

  },
  {
    path: 'products-women',
    component:WomenLayoutComponent

  },
  {
    path: 'products-kids',
    component:KidsLayoutComponent

  },
  {
    path: 'shopping-cart',
    component:ShoppingCartComponent,
    canActivate:[AuthGuard],

  },
  {
    path: 'about-us',
    component:AboutUsComponent
  },
  {
    path:'profile-settings',
    component:ProfileSettingsComponent,
    canActivate: [AuthGuard],
    children:[
      {
        path:'account',
        component:AccountComponent,
        canActivate: [AuthGuard]
      },
      {
        path:'payment',
        component:PaymentComponent,
        canActivate: [AuthGuard]

      },
      {
        path:'address',
        component:AddressComponent,
        canActivate: [AuthGuard]
      }
    ]
  },
  {
    path:'admin-dashboard',
    component:DashboardLayoutComponent,
    canActivate: [AdminGuard],
    children:[
      {
        path:'table',
        component: TableComponent,
        canActivate: [AdminGuard]
      },

      {
        path:'add-product',
        component:AddProductComponent,
        canActivate:[AdminGuard]
      },
      {
        path:'edit-product/:id',
        component:EditProductComponent,
        canActivate:[AdminGuard]

      },
      {
        path:'users-table',
        component:UsersTableComponent,
        canActivate:[AdminGuard]
      }
    ]
  },
  {
    path:'not-found',
    component:NotFoundComponent
  },
  {
    path: '**',
    redirectTo: 'not-found'

}
];
