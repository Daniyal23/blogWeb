
import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { Blog } from 'src/app/models/blog';
import { Comment } from 'src/app/models/comments';

import { AuthenticationService } from 'src/app/services/authentication.service';
import { BlogService } from 'src/app/services/blog.service';
import { CommentsService } from 'src/app/services/comments.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmDialogComponent, ConfirmDialogModel } from '../../confirmation-dialog/confirm-dialog/confirm-dialog.component';
import { FilterDialogComponent, FilterDialogModel } from '../../confirmation-dialog/filter-dialog/filter-dialog.component';
import { SearchDialogComponent, SearchDialogModel } from '../../confirmation-dialog/search-dialog/search-dialog.component';

export interface DialogData {
  comment: string;
}
class display {
  comment: Comment;
  blog: Blog;
  date: string;
}

@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: 'dialog-overview-example-dialog.html',
})
export class DialogOverviewExampleDialogforAllComments {

  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialogforAllComments>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

}

@Component({
  selector: 'app-admin-allcomments',
  templateUrl: './admin-allcomments.component.html',
  styleUrls: ['./admin-allcomments.component.css']
})
export class AdminAllcommentsComponent implements OnInit {


  public userdetails: any;
  public comments: any[] = [];
  public bloglist: any[] = [];
  public displaylist: display[] = [];
  public displaylistmain: display[] = [];

  public check = 0;
  public date: string = "";

  comment: string;
  donecheck: any = "";
  donecount = 0;

  commentdata: any = "";
  commentcount = 0;
  blogdata: any = "";
  blogcount = 0;

   public loading=false;
  constructor(
    private commentService: CommentsService,
    private AuthService: AuthenticationService,
    private blogService: BlogService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar,
    private cdr: ChangeDetectorRef,
  ) { }

  openDialog(inp): void {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialogforAllComments, {
      width: '350px',
      data: { comment: inp.content }
    });

    dialogRef.afterClosed().subscribe(result => {

      if (result != undefined) {
        if (result == "") {
          this.snackBar.open("Comment Cannot be Empty", null, {
            duration: 2000,
            panelClass: ['danger-snackbar'],
            horizontalPosition: 'right',
            verticalPosition: 'top'
          });
        } else {

          this.comment = result;
          if (inp.content != this.comment) {
            inp.content = this.comment;
            this.donecheck = "";
            this.donecount = 0;
            this.commentService.updateComment(inp._id, inp).subscribe(data => {
              this.donecheck = data; console.log(data);
            });
          }
        }
      }
    });
  }


  confirmDialog(inp1): void {
    const message = 'Are you sure you want to Delete this Comment?';

    const dialogData = new ConfirmDialogModel("Confirm Action", message);

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: "400px",
      data: dialogData
    });

    dialogRef.afterClosed().subscribe(dialogResult => {

      if (dialogResult == true) {
        this.deletecomment(inp1);
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
    const message = ['Ascending Date', 'Descending Date'];

    const dialogData = new FilterDialogModel(this.filtered, message);

    const dialogRef = this.dialog.open(FilterDialogComponent, {
      maxWidth: "400px",
      data: dialogData
    });

    dialogRef.afterClosed().subscribe(dialogResult => {

      if (dialogResult != false) {
        if (dialogResult == "Ascending Date") {
          this.filtered = dialogResult;
          this.displaylist.sort((a, b) => a.date.localeCompare(b.date));
        }
        else if (dialogResult == 'Descending Date') {
          this.filtered = dialogResult;

          this.displaylist.sort((a, b) => b.date.localeCompare(a.date));

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

      if (dialogResult != false) {
        if (dialogResult[0] == "username") {
          this.displaylistmain = this.displaylist;
          this.displaylist = this.displaylist.filter(a => a.comment.commentorUserName.toLowerCase().includes(dialogResult[1]));
          this.searched = "true";
        }
        else if (dialogResult[0] == 'blogname') {
          this.displaylistmain = this.displaylist;
          this.displaylist = this.displaylist.filter(a => a.blog.title.toLowerCase().includes(dialogResult[1]));
          this.searched = "true";


        }

      }

    });
  }
  searchreset() {
    this.displaylist = this.displaylistmain;
    this.searched = 'false';
  }


  ngOnInit(): void {
     this.loading=true;
    this.AuthService.checkaccessregular();
    this.AuthService.checkaccessblogger();
    this.userdetails = this.AuthService.parseJwt(localStorage.getItem("currentUser"));
    this.getcomments();
    this.getblogs();
  }
  ngAfterViewChecked() {
    if (this.comments.length > 0 && this.bloglist.length > 0 && this.check == 0) {
      this.check = 1;
      (this.comments.filter(a => a.commentorId == this.userdetails.id), "lol");
      this.bloglist.forEach(value => {
        if (value.commentsIdList != null) {
          value.commentsIdList.forEach(element => {
            this.comments.forEach(inp => {
              if (element == inp._id) {
                this.displaylist.push({ comment: inp, blog: value, date: "" });

              }
            });
          });
        }
      });
      this.dateset();
      this.loading=false;
      this.cdr.detectChanges();
    }
    if (this.donecheck != "" && this.donecount == 0) {

      if (this.donecheck == "Update complete") {
        this.snackBar.open("Comment Edit Successful", null, {
          duration: 2000,
          panelClass: ['success-snackbar'],
          horizontalPosition: 'right',
          verticalPosition: 'top'
        });
        this.donecount = 1;
      }
      else {
        this.snackBar.open("Server Error", null, {
          duration: 2000,
          panelClass: ['danger-snackbar'],
          horizontalPosition: 'right',
          verticalPosition: 'top'
        });
        this.donecount = 1;
      }
    }
    if (this.commentcount == 0 && this.commentdata != "") {
      this.snackBar.open("Comment Edit Successful", null, {
        duration: 2000,
        panelClass: ['success-snackbar'],
        horizontalPosition: 'right',
        verticalPosition: 'top'
      });
      this.commentcount = 1;
    }

  }
  dateset() {
    for (var i = 0; i < this.displaylist.length; i++) {
      //console.log(this.displaylist[i].comment.datePublished.toString());
      this.date = this.displaylist[i].comment.datePublished.toString();
      this.date = (this.date.split("T")[0]);
      var a = this.date.split("-");
      this.date = "";
      this.date = a[2] + "-" + a[1] + "-" + a[0];
      // console.log(this.date, "date");
      this.displaylist[i].date = this.date;
    }
  }

  getcomments() {
    this.commentService.getAllComments().subscribe(data => {
      this.comments = data["data"];
    })

  }

  getblogs() {
    this.blogService.getAllBlogs().subscribe(data => {
      this.bloglist = data["data"];
    })

  }

  editcomment(inp) {
    //console.log(inp, "edit comment");

  }
  deletecomment(inp) {
    this.displaylist.splice(this.displaylist.findIndex(a => a == inp), 1);
    inp.blog.commentsIdList.splice(inp.blog.commentsIdList.findIndex(a => a == inp.comment._id), 1);
    this.blogService.updateBlog(inp.blog._id, inp.blog).subscribe(data => {
      this.blogdata = data;
    });
    this.commentService.deleteComment(inp.comment._id).subscribe(data => {
      this.commentdata = data;
    });

  }

}
