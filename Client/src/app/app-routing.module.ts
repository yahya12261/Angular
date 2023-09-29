import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ProductComponent } from './pages/product/product.component';
import { AboutUsComponent } from './pages/about-us/about-us.component';
import { LoginComponent } from './pages/login/login.component';
import { CanActivate } from './helper/auth.guard';
import { AddProductComponent } from './pages/add-product/add-product.component';
import { ManageProductComponent } from './pages/manage-product/manage-product.component';
import { AddCategoryComponent } from './pages/add-category/add-category.component';


const routes: Routes = [
  // CanActivate
    // {path: '', component: HomeComponent},
    {path: 'home', component: HomeComponent},
    {path: 'product', component: ProductComponent},
    {path: 'about-us', component: AboutUsComponent},
    {path: 'login', component: LoginComponent},
    {path: 'add-product',canActivate:[CanActivate], component: AddProductComponent},
    {path: 'manage-product',canActivate:[CanActivate], component: ManageProductComponent},
    {path: 'add-category',canActivate:[CanActivate], component: AddCategoryComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
