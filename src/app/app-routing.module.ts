import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoriesComponent } from 'src/components/categories/categories/categories.component';
import { ProductsComponent } from 'src/components/products/products/products.component';
import { EditProfileComponent } from 'src/components/users/edit-profile/edit-profile.component';
import { FindFriendsComponent } from 'src/components/users/find-friends/find-friends.component';
import { LoginComponent } from 'src/components/users/login/login.component';
import { ProfileComponent } from 'src/components/users/profile/profile.component';
import { RegisterComponent } from 'src/components/users/register/register.component';
import { IsLoggedGuard } from 'src/guards/islogged.guard';

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
  },
  {
    path:"login",
    component:LoginComponent
  },
  {
    path:"register",
    component:RegisterComponent
  },
  {
    path:"find-friends",
    component:FindFriendsComponent
  },
  {
    path:"profile",
    component:ProfileComponent,
    children:[
      {
        path:"edit-profile",
        component:EditProfileComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
