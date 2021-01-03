import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './guards/auth.guard';
import { GuestGuard } from './guards/guest.guard';
import { BlogAddComponent } from './components/blog-add/blog-add.component';
import { BlogDetailsComponent } from './components/blog-details/blog-details.component';
import { BlogListComponent } from './components/blog-list/blog-list.component';
import { AdminViewusersComponent } from './components/admin-viewusers/admin-viewusers.component';
import { AdminViewblogsComponent } from './components/admin-viewblogs/admin-viewblogs.component';
import { AdminBlogeditComponent } from './components/admin-blogedit/admin-blogedit.component';


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
    path: 'blog/detail/:id',
    component: BlogDetailsComponent,
    canActivate: [AuthGuard],
    children: [
    ]
  },
  {
    path: 'blog',
    component: BlogListComponent,
    //canActivate: [AuthGuard],
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
  {
    path: 'admin/listusers',
    component: AdminViewusersComponent,
    canActivate: [AuthGuard],
    children: [
    ]
  },
  {
    path: 'admin/listblogs',
    component: AdminViewblogsComponent,
    canActivate: [AuthGuard],
    children: [
    ]
  },
  {
    path: 'admin/editblog/:id',
    component: AdminBlogeditComponent,
    canActivate: [AuthGuard],
    children: [
    ]
  },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
