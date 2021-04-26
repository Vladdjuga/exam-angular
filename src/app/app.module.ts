import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { NgxSpinnerModule } from "ngx-spinner";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ProductsComponent } from 'src/components/products/products/products.component';
import { NavbarComponent } from 'src/components/navbar/navbar.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MDBBootstrapModule } from 'angular-bootstrap-md'
import { AddProductComponent } from 'src/components/products/add-product/add-product.component';
import { FormsModule } from '@angular/forms';
import { CategoriesComponent } from 'src/components/categories/categories/categories.component';
import { AddCategoryComponent } from 'src/components/categories/add-category/add-category.component';
import { UpdateProductComponent } from 'src/components/products/update-product/update-product.component';
import { UpdateCategoryComponent } from 'src/components/categories/update-category/update-category.component';
import { NotifierModule } from 'angular-notifier';
import { MdbModule } from 'mdb-angular-ui-kit';
import { LoginComponent } from 'src/components/users/login/login.component';
import { IsLoggedGuard } from 'src/guards/islogged.guard';
import { TokenInterceptor } from 'src/helpers/interceptor';
import { ProfileComponent } from 'src/components/users/profile/profile.component';
import { EditProfileComponent } from 'src/components/users/edit-profile/edit-profile.component';

@NgModule({
  declarations: [
    AppComponent,
    ProductsComponent,
    NavbarComponent,
    AddProductComponent,
    CategoriesComponent,
    AddCategoryComponent,
    UpdateProductComponent,
    UpdateCategoryComponent,
    LoginComponent,
    ProfileComponent,
    EditProfileComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    NgxSpinnerModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MDBBootstrapModule.forRoot(),
    FormsModule,
    NotifierModule.withConfig(),
    MdbModule
  ],
  providers: [IsLoggedGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
})
export class AppModule { }
