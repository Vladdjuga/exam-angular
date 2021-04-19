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
import { HttpClientModule } from '@angular/common/http';
import {MDBBootstrapModule} from 'angular-bootstrap-md'
import { AddProductComponent } from 'src/components/products/add-product/add-product.component';
import { FormsModule } from '@angular/forms';
import { CategoriesComponent } from 'src/components/categories/categories/categories.component';
import { AddCategoryComponent } from 'src/components/categories/add-category/add-category.component';
import { UpdateProductComponent } from 'src/components/products/update-product/update-product.component';

@NgModule({
  declarations: [
    AppComponent,
    ProductsComponent,
    NavbarComponent,
    AddProductComponent,
    CategoriesComponent,
    AddCategoryComponent,
    UpdateProductComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    NgxSpinnerModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MDBBootstrapModule.forRoot(),
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA,NO_ERRORS_SCHEMA],
})
export class AppModule { }
