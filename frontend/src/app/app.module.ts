import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularMaterialModule } from "./angular-material.module";
import { environment } from '../environments/environment';
import { RegisterComponent } from './components/auth/register/register.component';
import { BlogDetailsComponent } from './components/blog/blog-details/blog-details.component';
import { BlogAddComponent } from './components/blog/blog-add/blog-add.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/auth/login/login.component';
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
import { CommentComponent } from './components/shared/comment/comment.component';
import { BlogListComponent } from './components/blog/blog-list/blog-list.component';
import { BlogCardComponent } from './components/shared/blog-card/blog-card.component';
import { AdminViewusersComponent } from './components/admin/admin-viewusers/admin-viewusers.component';
import { AdminViewblogsComponent } from './components/admin/admin-viewblogs/admin-viewblogs.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { AdminBlogeditComponent } from './components/admin/admin-blogedit/admin-blogedit.component';
import { AdminUserapproveComponent } from './components/admin/admin-userapprove/admin-userapprove.component';
import { CommentEditComponent, DialogOverviewExampleDialog } from './components/Comments/comment-edit/comment-edit.component';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { MatDialogModule } from '@angular/material/dialog';
import { EditprofileComponent } from './components/auth/editprofile/editprofile.component';
import { AdminAllcommentsComponent, DialogOverviewExampleDialogforAllComments } from './components/admin/admin-allcomments/admin-allcomments.component';
import { MyblogsComponent } from './components/blog/myblogs/myblogs.component';
import { ConfirmDialogComponent } from './components/confirmation-dialog/confirm-dialog/confirm-dialog.component';
import { FilterDialogComponent } from './components/confirmation-dialog/filter-dialog/filter-dialog.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { SearchDialogComponent } from './components/confirmation-dialog/search-dialog/search-dialog.component';
import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';
import 'froala-editor/js/plugins.pkgd.min.js';
import{ProfileDisplayComponent} from './components/shared/profile-display/profile-display.component';
import { NgxLoadingModule } from 'ngx-loading';

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
    ConfirmDialogComponent,
    FilterDialogComponent,
    SearchDialogComponent,
    ProfileDisplayComponent
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
    MatDialogModule,
    MatCheckboxModule,
    FroalaEditorModule.forRoot(),
    FroalaViewModule.forRoot(),
    NgxLoadingModule.forRoot({})


  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  entryComponents: [ConfirmDialogComponent, CommentEditComponent, DialogOverviewExampleDialog, DialogOverviewExampleDialogforAllComments]

})
export class AppModule { }
