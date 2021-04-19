import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoriesComponent } from 'src/components/categories/categories/categories.component';
import { ProductsComponent } from 'src/components/products/products/products.component';

const routes: Routes = [
  {
    path:"products",
    children:[
      {
        path:"products",
        component:ProductsComponent
      }
    ],
    component:ProductsComponent
  },
  {
    path:"categories",
    children:[
      {
        path:"categories",
        component:CategoriesComponent
      }
    ],
    component:CategoriesComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
