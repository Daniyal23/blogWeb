import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './guards/auth.guard';
import { GuestGuard } from './guards/guest.guard';
import { BlogAddComponent } from './components/blog-add/blog-add.component';
import { BlogDetailsComponent } from './components/blog-details/blog-details.component';


const routes: Routes = [
  // { path: 'register', component: RegisterComponent },
  // { path: 'home', component: HomeComponent },
  // { path: 'login', component: LoginComponent },

  // { path: '**', redirectTo: 'register' },

  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },

  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthGuard],
    children: [

    ]

  },
  {
    path: 'blog/add',
    component: BlogAddComponent,
    canActivate: [AuthGuard],
    children: [
    ]
  },
  {
    path: 'blog/detail',
    component: BlogDetailsComponent,
    canActivate: [AuthGuard],
    children: [
    ]
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [GuestGuard]
  },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [GuestGuard]
  },
  
  


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
