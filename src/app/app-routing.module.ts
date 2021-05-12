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
import { IsNotLoggedGuard } from 'src/guards/isnotLogged.guard';

const routes: Routes = [
  {
    path:"login",
    component:LoginComponent,
    canActivate:[IsNotLoggedGuard]
  },
  {
    path:"register",
    component:RegisterComponent,
    canActivate:[IsNotLoggedGuard]
  },
  {
    path:"find-friends",
    component:FindFriendsComponent,
    canActivate:[IsLoggedGuard]
  },
  {
    path:"friend-profile/:friend",
    component:FriendProfileComponent,
    canActivate:[IsLoggedGuard]
  },
  {
    path:"chat",
    component:ChatComponent,
    canActivate:[IsLoggedGuard]
  },
  {
    path:"profile",
    component:ProfileComponent,
    canActivate:[IsLoggedGuard]
  },
  {
    path:"edit-profile",
    component:EditProfileComponent,
    canActivate:[IsLoggedGuard]
  },
  {
    path:"",
    component:HomeComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
