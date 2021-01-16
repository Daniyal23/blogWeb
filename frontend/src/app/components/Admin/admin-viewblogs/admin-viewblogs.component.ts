import { Component, Inject, OnInit } from '@angular/core';
import { Blog } from 'src/app/models/blog';
import { BlogService } from 'src/app/services/blog.service';
import { MatSlideToggleModule } from '@angular/material/slide-toggle'
import { AuthenticationService } from 'src/app/services/authentication.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmDialogComponent, ConfirmDialogModel } from '../../confirmation-dialog/confirm-dialog/confirm-dialog.component';
import { FilterDialogComponent, FilterDialogModel } from '../../confirmation-dialog/filter-dialog/filter-dialog.component';
import { SearchDialogComponent, SearchDialogModel } from '../../confirmation-dialog/search-dialog/search-dialog.component';


@Component({
  selector: 'app-admin-viewblogs',
  templateUrl: './admin-viewblogs.component.html',
  styleUrls: ['./admin-viewblogs.component.css']
})
export class AdminViewblogsComponent implements OnInit {
  public blogs: any[] = [];
  public blogmain: any[] = [];
  constructor(
    public blogService: BlogService,
    private AuthService: AuthenticationService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar,
  ) { }


  confirmDialog(inp1): void {
    const message = 'Are you sure you want to Delete this Blog?';

    const dialogData = new ConfirmDialogModel("Confirm Action", message);

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: "400px",
      data: dialogData
    });

    dialogRef.afterClosed().subscribe(dialogResult => {
      //console.log(dialogResult);
      if (dialogResult == true) {
        this.delete(inp1);
        this.snackBar.open("Deleted successfully", null, {
          duration: 2000,
          panelClass: ['success-snackbar'],
          horizontalPosition: 'right',
          verticalPosition: 'top'
        });
      }
      else {

      }

    });
  }
  public filtered: string = "";

  filterDialog(): void {
    const message = ['created on', 'likes', 'dislikes'];

    const dialogData = new FilterDialogModel(this.filtered, message);

    const dialogRef = this.dialog.open(FilterDialogComponent, {
      maxWidth: "400px",
      data: dialogData
    });

    dialogRef.afterClosed().subscribe(dialogResult => {
      //console.log(dialogResult);
      if (dialogResult != false) {
        if (dialogResult == "created on") {
          this.filtered = dialogResult;
          this.blogs.sort((a, b) => a.dateSubmitted.localeCompare(b.dateSubmitted));
        }
        else if (dialogResult == 'likes') {
          this.filtered = dialogResult;

          this.blogs.sort((a, b) => b.numLikes - a.numLikes);

        }
        else if (dialogResult == 'dislikes') {
          this.filtered = dialogResult;

          this.blogs.sort((a, b) => b.numDislikes - a.numDislikes);

        }

      }

    });
  }

  public searched: string = "";
  public searchtext: string = "";


  searchDialog(): void {
    const message = ['username', 'blogname'];

    const dialogData = new SearchDialogModel(this.searched, message, this.searchtext);

    const dialogRef = this.dialog.open(SearchDialogComponent, {
      maxWidth: "400px",
      data: dialogData
    });

    dialogRef.afterClosed().subscribe(dialogResult => {
      //console.log(dialogResult);
      if (dialogResult != false) {
        if (dialogResult[0] == "username") {
          this.blogmain = this.blogs;
          this.blogs = this.blogs.filter(a => a.creatorName.toLowerCase().includes(dialogResult[1]));
          this.searched = "true";
        }
        else if (dialogResult[0] == 'blogname') {
          this.blogmain = this.blogs;
          this.blogs = this.blogs.filter(a => a.title.toLowerCase().includes(dialogResult[1]));
          this.searched = "true";


        }

      }

    });
  }
  searchreset() {
    this.blogs = this.blogmain;
    this.searched = 'false';
  }

  ngOnInit(): void {
    this.AuthService.checkaccessblogger();
    this.AuthService.checkaccessmoderator();
    this.AuthService.checkaccessregular();
    this.getblogs();
  }
  getblogs() {
    this.blogService.getAllBlogs().subscribe(data => {
      this.blogs = data["data"];
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
