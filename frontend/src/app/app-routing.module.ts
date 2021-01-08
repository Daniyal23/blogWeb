import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterComponent } from './components/auth/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/auth/login/login.component';
import { AuthGuard } from './guards/auth.guard';
import { GuestGuard } from './guards/guest.guard';
import { BlogAddComponent } from './components/blog/blog-add/blog-add.component';
import { BlogDetailsComponent } from './components/blog/blog-details/blog-details.component';
import { BlogListComponent } from './components/blog/blog-list/blog-list.component';
import { AdminViewusersComponent } from './components/admin/admin-viewusers/admin-viewusers.component';
import { AdminViewblogsComponent } from './components/admin/admin-viewblogs/admin-viewblogs.component';
import { AdminBlogeditComponent } from './components/admin/admin-blogedit/admin-blogedit.component';
import { AdminUserapproveComponent } from './components/admin/admin-userapprove/admin-userapprove.component';
import { CommentEditComponent } from './components/Comments/comment-edit/comment-edit.component';
import { EditprofileComponent } from './components/auth/editprofile/editprofile.component';
import { AdminAllcommentsComponent } from './components/admin/admin-allcomments/admin-allcomments.component';
import { MyblogsComponent } from './components/blog/myblogs/myblogs.component';


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
  {
    path: 'admin/approveusers',
    component: AdminUserapproveComponent,
    canActivate: [AuthGuard],
    children: [
    ]
  },
  {
    path: 'commentedit',
    component: CommentEditComponent,
    canActivate: [AuthGuard],
    children: [
    ]
  },
  {
    path: 'editprofile',
    component: EditprofileComponent,
    canActivate: [AuthGuard],
    children: [
    ]
  },
  {
    path: 'admin/allcomments',
    component: AdminAllcommentsComponent,
    canActivate: [AuthGuard],
    children: [
    ]
  },
  {
    path: 'myblogs',
    component: MyblogsComponent,
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
