import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { HeaderComponent } from './components/header/header.component';
import { ProductComponent } from './pages/product/product.component';
import { FooterComponent } from './components/footer/footer.component';
import { AboutUsComponent } from './pages/about-us/about-us.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ProductSharing } from './services/product-sharing.service';
import { LoginComponent } from './pages/login/login.component';
import { AdminNavbarComponent } from './components/admin-navbar/admin-navbar.component';
import { AddProductComponent } from './pages/add-product/add-product.component';
import { ManageProductComponent } from './pages/manage-product/manage-product.component';
import { AddCategoryComponent } from './pages/add-category/add-category.component';
import { authInterceptorProviders } from './helper/auth.interceptor';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    ProductComponent,
    FooterComponent,
    AboutUsComponent,
    LoginComponent,
    AdminNavbarComponent,
    AddProductComponent,
    ManageProductComponent,
    AddCategoryComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    
  ],
  providers: [authInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
 