import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularMaterialModule } from "./angular-material.module";
import { environment } from '../environments/environment';
import { RegisterComponent } from './components/register/register.component';
import { BlogDetailsComponent } from './components/blog-details/blog-details.component';
import { BlogAddComponent } from './components/blog-add/blog-add.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatInputModule } from '@angular/material/input';
import { HttpClientModule } from '@angular/common/http';
import { MatFormFieldModule, } from '@angular/material/form-field';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MatGridListModule } from '@angular/material/grid-list';
import { AngularEditorModule } from '@kolkov/angular-editor';

import { RecaptchaModule } from 'ng-recaptcha';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { CommentComponent } from './components/comment/comment.component';
import { BlogListComponent } from './components/blog-list/blog-list.component';
import { BlogCardComponent } from './components/blog-card/blog-card.component';
import { AdminViewusersComponent } from './components/admin-viewusers/admin-viewusers.component';
import { AdminViewblogsComponent } from './components/admin-viewblogs/admin-viewblogs.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { AdminBlogeditComponent } from './components/admin-blogedit/admin-blogedit.component';
import { AdminUserapproveComponent } from './components/admin-userapprove/admin-userapprove.component';
import { CommentEditComponent, DialogOverviewExampleDialog } from './components/comment-edit/comment-edit.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { MatDialogModule } from '@angular/material/dialog';
import { EditprofileComponent } from './components/editprofile/editprofile.component';
import { AdminAllcommentsComponent, DialogOverviewExampleDialogforAllComments } from './components/admin-allcomments/admin-allcomments.component';
import { MyblogsComponent } from './components/myblogs/myblogs.component';


@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    BlogDetailsComponent,
    BlogAddComponent,
    DashboardComponent,
    HomeComponent,
    LoginComponent,
    CommentComponent,
    BlogListComponent,
    BlogCardComponent,
    AdminViewusersComponent,
    AdminViewblogsComponent,
    AdminBlogeditComponent,
    AdminUserapproveComponent,
    CommentEditComponent,
    DialogOverviewExampleDialog,
    DialogOverviewExampleDialogforAllComments,
    NavbarComponent,
    EditprofileComponent,
    AdminAllcommentsComponent,
    MyblogsComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    BrowserModule,
    AppRoutingModule,
    RecaptchaModule,
    CommonModule,
    MatCardModule,
    MatTabsModule,
    FormsModule,
    MatSlideToggleModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatSnackBarModule,
    MatInputModule,
    MatFormFieldModule,
    MatGridListModule,
    AngularEditorModule,
    MatDialogModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  entryComponents: [CommentEditComponent, DialogOverviewExampleDialog, DialogOverviewExampleDialogforAllComments]

})
export class AppModule { }
