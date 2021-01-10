import { Component, Inject, OnInit } from '@angular/core';
import { Blog } from 'src/app/models/blog';
import { BlogService } from 'src/app/services/blog.service';
import { MatSlideToggleModule } from '@angular/material/slide-toggle'
import { AuthenticationService } from 'src/app/services/authentication.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';


export interface DialogData {
  comment: string;

}

@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: 'dialog-overview-example-dialog.html',
})
export class DialogOverviewExampleDialogforAllComments {

  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialogforAllComments>) { }

  onNoClick(inp): void {
    this.dialogRef.close('No');
  }
  onYesClick(inp): void {
    this.dialogRef.close('Yes');
  }

}





@Component({
  selector: 'app-admin-viewblogs',
  templateUrl: './admin-viewblogs.component.html',
  styleUrls: ['./admin-viewblogs.component.css']
})
export class AdminViewblogsComponent implements OnInit {
  public blogs: any[] = [];
  constructor(
    public blogService: BlogService,
    private AuthService: AuthenticationService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar,
  ) { }
   
  openDialog(inp): void {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialogforAllComments, {
      width: '250px',
     
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
     
      console.log(result);
      if(result=='Yes'){
        this.delete(inp);
        this.snackBar.open("Deleted successfully", null, {
          duration: 2000,
          panelClass: ['success-snackbar'],
          horizontalPosition: 'right',
          verticalPosition: 'top'
        });
      }
      else{

      }
    });
    
  }


  ngOnInit(): void {
    this.AuthService.checkaccessblogger();
    this.AuthService.checkaccessmoderator();
    this.AuthService.checkaccessregular();
    this.getblogs();
  }
  getblogs() {
    this.blogService.getAllBlogs().subscribe(data => {
      this.blogs = data;
    })
    this.blogs.forEach(value => {
      //console.log(value, "getblogs")
    }
    )

  }
  approve(inp) {
    this.blogs[this.blogs.findIndex(a => a._id == inp)].isApproved = true;
    this.blogService.updateBlog(inp, this.blogs.find(a => a._id == inp)).subscribe(data => {
      console.log(data);
    })
  }
  delete(inp) {
    this.blogs.splice(this.blogs.findIndex(a => a._id == inp), 1);
    this.blogService.deleteBlog(inp).subscribe(data => {
      console.log(data);
    });
  }
  statuss(inp) {
    if (this.blogs[this.blogs.findIndex(a => a._id == inp)].status != "show") {
      this.blogs[this.blogs.findIndex(a => a._id == inp)].status = "show";
      this.blogService.updateBlog(inp, this.blogs.find(a => a._id == inp)).subscribe(data => {
        console.log(data);
      });

    }
    else {
      this.blogs[this.blogs.findIndex(a => a._id == inp)].status = "hidden";
      this.blogService.updateBlog(inp, this.blogs.find(a => a._id == inp));
    }
  }
  logout() {
    this.AuthService.logout();
  }
}
