import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsComponent } from 'src/components/products/products/products.component';

const routes: Routes = [
  {
    path:"products",
    children:[
      {
        path:"products",
        component:ProductsComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
