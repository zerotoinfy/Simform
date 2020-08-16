import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProductCreateComponent } from './components/product-create/product-create.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductEditComponent } from './components/product-edit/product-edit.component';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { ProductGridListComponent } from './components/product-grid-list/product-grid-list.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [

  { 
    path: '', pathMatch: 'full', 
    redirectTo: 'login' 
  },
  { 
    path: 'view-products', 
    component: ProductGridListComponent,
    canActivate: [AuthGuard]
  },
  { 
    path: 'login', 
    component: LoginComponent 
  },
  { 
    path: 'welcome', 
    component: WelcomeComponent,
    canActivate: [AuthGuard] 
  },
  { 
    path: 'register', 
    component: RegisterComponent 
  },
  { 
    path: 'create-product', 
    component: ProductCreateComponent,
    canActivate: [AuthGuard]
  },
  { 
    path: 'edit-product/:id', 
    component: ProductEditComponent,
    canActivate: [AuthGuard]
  },
  { 
    path: 'product-list', 
    component: ProductListComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }