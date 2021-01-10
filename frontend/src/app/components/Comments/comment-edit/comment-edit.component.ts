import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { Blog } from 'src/app/models/blog';
import { Comment } from 'src/app/models/comments';

import { AuthenticationService } from 'src/app/services/authentication.service';
import { BlogService } from 'src/app/services/blog.service';
import { CommentsService } from 'src/app/services/comments.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

export interface DialogData {
  comment: string;
}

@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: 'dialog-overview-example-dialog.html',
})
export class DialogOverviewExampleDialog {

  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

    onNoClick(inp): void {
      this.dialogRef.close('No');
    }
    onYesClick(inp): void {
      this.dialogRef.close('Yes');
    }

}

class display {
  comment: Comment;
  blog: Blog;
  date: string;
}

@Component({
  selector: 'app-comment-edit',
  templateUrl: './comment-edit.component.html',
  styleUrls: ['./comment-edit.component.css']
})
export class CommentEditComponent implements OnInit {

  public userdetails: any;
  public comments: any[] = [];
  public bloglist: any[] = [];
  public displaylist: display[] = [];
  public check = 0;
  public date: string = "";

  comment: string;
  donecheck: any = "";
  donecount = 0;

  commentdata: any = "";
  commentcount = 0;
  blogdata: any = "";
  blogcount = 0;


  constructor(
    private commentService: CommentsService,
    private AuthService: AuthenticationService,
    private blogService: BlogService,
    public dialog: MatDialog,
    private cdr: ChangeDetectorRef,
    private snackBar: MatSnackBar,
  ) { }

  openDialog(inp): void {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      width: '250px',
     
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
     
      console.log(result);
      if(result=='Yes'){
        this.deletecomment(inp);
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
    //console.log("hello");
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
      // console.log(this.displaylist, "yo");
    }
    if (this.donecheck != "" && this.donecount == 0) {
      //console.log("yoyoyoyoyo");
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
      console.log(this.commentdata);
      if (this.commentdata == "Deleted Successfully")
        this.snackBar.open("Comment Deleted Successful", null, {
          duration: 2000,
          panelClass: ['success-snackbar'],
          horizontalPosition: 'right',
          verticalPosition: 'top'
        });
      this.commentcount = 1;
    }
    this.cdr.detectChanges();
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
      this.comments = data;
    })

  }

  getblogs() {
    this.blogService.getAllBlogs().subscribe(data => {
      this.bloglist = data;
    })

  }

  editcomment(inp) {
    //console.log(inp, "edit comment");

  }
  deletecomment(inp) {
    console.log(inp, "delete comment");
    this.displaylist.splice(this.displaylist.findIndex(a => a == inp), 1);
    //this.bloglist[this.bloglist.findIndex(a=>a._id==inp.blog._id)].commentsIdList.splice(inp.comment._id);    
    inp.blog.commentsIdList.splice(a => a == inp.comment._id, 1);

    // this.displaylist[a].blog = inp
    this.blogService.updateBlog(inp.blog._id, inp.blog).subscribe(data => {
      this.blogdata = data;
    });
    this.commentService.deleteComment(inp.comment._id).subscribe(data => {
      this.commentdata = data;
    });

  }

}
