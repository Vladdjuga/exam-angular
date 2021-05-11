import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoriesComponent } from 'src/components/categories/categories/categories.component';
import { ChatComponent } from 'src/components/chat/chat.component';
import { HomeComponent } from 'src/components/home/home.component';
import { ProductsComponent } from 'src/components/products/products/products.component';
import { EditProfileComponent } from 'src/components/users/edit-profile/edit-profile.component';
import { FindFriendsComponent } from 'src/components/users/find-friends/find-friends.component';
import { FriendProfileComponent } from 'src/components/users/friends/friend-profile/friend-profile.component';
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
    path:"friend-profile/:friend",
    component:FriendProfileComponent
  },
  {
    path:"chat",
    component:ChatComponent
  },
  {
    path:"profile",
    component:ProfileComponent,
  },
  {
    path:"edit-profile",
    component:EditProfileComponent
  },
  {
    path:"home",
    component:HomeComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
