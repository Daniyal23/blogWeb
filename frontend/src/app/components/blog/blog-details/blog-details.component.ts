import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { Blog } from 'src/app/models/blog';
import { Comment } from 'src/app/models/comments'
import { DomSanitizer } from '@angular/platform-browser';

import { AngularEditorConfig } from '@kolkov/angular-editor';
import { fakeAsync } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { BlogService } from 'src/app/services/blog.service';

import { Interaction } from 'src/app/models/interaction';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { CommentsService } from 'src/app/services/comments.service';
import { ThrowStmt } from '@angular/compiler';
import { NgModel } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ConfirmDialogComponent, ConfirmDialogModel } from '../../confirmation-dialog/confirm-dialog/confirm-dialog.component';


@Component({
  selector: 'app-blog-details',
  templateUrl: './blog-details.component.html',
  styleUrls: ['./blog-details.component.css']
})
export class BlogDetailsComponent implements OnInit {
  //comments = Comments;// Passing the data here (Comments is an arrayy of comments) pass data in this var to display
  constructor(private sanitizer: DomSanitizer,
    private route: ActivatedRoute,
    private blogService: BlogService,

    private AuthService: AuthenticationService,
    private commentService: CommentsService,
    private snackBar: MatSnackBar,
    private authGuard: AuthGuard,
    private router: Router,
    private cdr: ChangeDetectorRef,
    public dialog: MatDialog,

  ) { }
  public blogs?;
  public img: any;
  public imgsrcs: Array<any> = [];
  public interact: Interaction = new Interaction();
  public reports: Interaction = new Interaction();


  public comment: Comment = new Comment();

  public commentlist: any = [];

  public newcommentid = "";
  public newcomment = 1;
  commentContent = '';
  bckColor = 'white'
  name = 'Angular 6';
  htmlContent = '';
  userdetials: any;
  public done = 0;
  public userID;
  public liked = 0;
  public disliked = 0;
  public date: string = "";
  public changeLike = 0;
  public changedisLike = 0;

  public interactionlistindex = 0;
  public boss = 1;

  public report = 0;


  config: AngularEditorConfig = {
    editable: false,
    spellcheck: true,
    enableToolbar: false,
    showToolbar: false,
    height: 'auto',
    minHeight: '',
    maxHeight: 'auto',
    placeholder: 'Enter text here...',
    translate: 'no',
    defaultParagraphSeparator: 'p',
    defaultFontName: 'Arial',
    outline: false,
    toolbarHiddenButtons: [
      ['bold']
    ],
    customClasses: [
      {
        name: "quote",
        class: "quote",
      },
      {
        name: 'redText',
        class: 'redText'
      },
      {
        name: "titleText",
        class: "titleText",
        tag: "h1",
      },
      {
        name: "img",
        class: "img",
      },
    ]
  };


  confirmDialog(inp, inp2, inp3): void {
    const message = 'Are you sure you want to Delete this Comment?';

    const dialogData = new ConfirmDialogModel("Confirm Action", message);

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: "400px",
      data: dialogData
    });

    dialogRef.afterClosed().subscribe(dialogResult => {
      // console.log(dialogResult);
      //console.log(result);
      if (dialogResult == true) {
        if (inp3 == "delete") {
          this.commentDelete(inp, inp2);
          this.snackBar.open("Deleted successfully", null, {
            duration: 2000,
            panelClass: ['success-snackbar'],
            horizontalPosition: 'right',
            verticalPosition: 'top'
          });
        }
        else {

        }
      }
      else {

      }

    });
  }
  
  confirmReport(): void {
    const message = 'Are you sure you want to Report ?';

    const dialogData = new ConfirmDialogModel("Confirm Action", message);

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: "400px",
      data: dialogData
    });

    dialogRef.afterClosed().subscribe(dialogResult => {
      // console.log(dialogResult);
      //console.log(result);
      if (dialogResult == true) {
        
          this.nbrreport();
          this.snackBar.open("Reported successfully", null, {
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
  confirmdeReport(): void {
    const message = 'Are you sure you want to Remove Report ?';

    const dialogData = new ConfirmDialogModel("Confirm Action", message);

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: "400px",
      data: dialogData
    });

    dialogRef.afterClosed().subscribe(dialogResult => {
      // console.log(dialogResult);
      //console.log(result);
      if (dialogResult == true) {
        
          this.nbrDeReport();
          this.snackBar.open("Report Removed successfully", null, {
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

  ngOnInit(): void {
    this.getblogbyid();
    this.userdetials = this.AuthService.parseJwt(localStorage.getItem("currentUser"));
    //console.log(this.userdetials);
    //console.log(this.userdetials.id);

    this.userID = this.userdetials.id;
    if (this.AuthService.getuserdetails().accountType == "admin") {
      this.boss = 0;
    }
  }
  ngAfterViewChecked() {
    if (this.blogs && this.done == 0) {


      //console.log(this.blogs);
      for (let key in this.blogs.blogHeaderImage) {
        //console.log("here");
        this.blogs.blogHeaderImage[key] = this.sanitizer.bypassSecurityTrustUrl(key);
        this.imgsrcs.push(this.sanitizer.bypassSecurityTrustUrl(key));

      }
      this.img = this.imgsrcs[this.imgsrcs.length - 1];
      //console.log(this.img);
      this.htmlContent = this.blogs.text;
      this.done = 1;
      this.dateset();
      this.interact.blogId = this.blogs._id;
      this.interact.userId = this.userdetials.id;
      this.interact.InteractionType = "";
      if (this.blogs.reportlistList == undefined) {
        this.blogs.reportlistList = [];
      }
      else {
        var a = this.blogs.reportlistList.find(a => a.userId == this.userdetials.id);
        if (a) {
          this.report = 1;
        }
      }

      if (this.blogs.interactionIdList) {
        if (this.blogs.interactionIdList.length == 0) {
          this.blogs.interactionIdList = [];
          //console.log("interaction list rein")
        }
        else {
          //console.log("in eleeee");
          var a = this.blogs.interactionIdList.find(a => a.userId == this.userdetials.id);
          if (a) {
            this.interact = a;
          }

          if (this.interact) {
            //console.log("interact from db", this.interact);
            if (this.interact.InteractionType == "Like") {
              this.liked = 1;
            }
            else if (this.interact.InteractionType == "Dislike") {
              this.disliked = 1;
            }
          }
        }
      }
      else {
        this.blogs.interactionIdList = [];
      }

      this.getCommentbyid();
    }

    if (this.newcommentid != "" && this.newcomment == 0) {
      //console.log(this.newcommentid, "hello");
      if (!this.blogs.commentsIdList) {
        this.blogs.commentsIdList = [];
      }
      //console.log(this.newcommentid, "ja");
      if (this.newcommentid == "Validation error") {
        this.snackBar.open("Server Error. Please try again later", null, {
          duration: 2000,
          panelClass: ['danger-snackbar'],
          horizontalPosition: 'right',
          verticalPosition: 'top'
        });
        this.newcomment = 1;
      } else {
        this.blogs.commentsIdList.push(this.newcommentid);
        this.newcomment = 1;
        this.blogService.updateBlog(this.blogs._id, this.blogs).subscribe(data => {
          console.log(data);
        });
        //console.log(this.comment, "here is if");
        //console.log(this.commentlist, "herer is before push");
        this.commentlist.push({
          '_id': this.newcommentid,
          'commentorId': this.comment.commentorId,
          'Avatar': this.comment.Avatar,
          'datePublished': this.comment.datePublished,
          'commentorUserName': this.comment.commentorUserName,
          'likes': this.comment.likes,
          'dislikes': this.comment.dislikes,
          'content': this.comment.content
        });
        //console.log(this.commentlist, "herer is after push");
        this.snackBar.open("Comment Successfully Added", null, {
          duration: 2000,
          panelClass: ['success-snackbar'],
          horizontalPosition: 'right',
          verticalPosition: 'top'
        });
      }
    }
    this.cdr.detectChanges();
  }


  nbrLike() {
    this.authcheck();

    //////////////////////////////////
    this.changeLike = 0;

    if (this.disliked == 1 && this.liked == 0) {
      this.disliked = 0;
      this.blogs.numDislikes = this.blogs.numDislikes - 1;
      this.blogs.numLikes = this.blogs.numLikes + 1;
      this.liked = 1;

      this.interactingupdate("Like");
    }
    else if (this.liked == 0 && this.disliked == 0) {
      this.blogs.numLikes = this.blogs.numLikes + 1;
      this.liked = 1;

      this.interactingadd("Like");
    }
    else {

      this.blogs.numLikes = this.blogs.numLikes - 1;
      this.liked = 0;
      this.changeLike = 1;

      this.blogs.interactionIdList.splice(this.blogs.interactionIdList.indexOf(a => a.userid == this.userdetials.id));
      this.blogService.updateBlog(this.blogs._id, this.blogs).subscribe(data => {
        console.log(data);
      });;
    }

  }
  nbrDislike() {
    this.authcheck();

    //////////////////////////////////

    if (this.disliked == 0 && this.liked == 0) {
      this.blogs.numDislikes = this.blogs.numDislikes + 1;
      this.disliked = 1;
      this.interactingadd("Dislike");
    }
    else if (this.liked == 1 && this.disliked == 0) {
      this.liked = 0;
      this.blogs.numLikes = this.blogs.numLikes - 1;
      this.blogs.numDislikes = this.blogs.numDislikes + 1;
      this.disliked = 1;
      this.interactingupdate("Dislike");
    }

    else {
      this.blogs.numDislikes = this.blogs.numDislikes - 1;
      this.disliked = 0;

      this.blogs.interactionIdList.splice(this.blogs.interactionIdList.indexOf(a => a.userId == this.userdetials.id));
      this.blogService.updateBlog(this.blogs._id, this.blogs).subscribe(data => {
        console.log(data);
      });;
    }
  }

  nbrreport() {
    this.authcheck();

    this.report = 1;
    this.blogs.reportsCounter += 1;
    this.reports.InteractionType = "report";
    this.reports.blogId = this.blogs._id;
    this.reports.timestamp = new Date();
    this.reports.userId = this.userdetials.id;
    this.blogs.reportlistList.push(this.reports);
    this.blogService.updateBlog(this.blogs._id, this.blogs).subscribe(data => {
      console.log(data);
    });
  }

  nbrDeReport() {
    this.authcheck();

    this.report = 0;
    this.blogs.reportsCounter -= 1;
    this.blogs.reportlistList.splice(a => a.userId == this.userdetials.id);
    this.blogService.updateBlog(this.blogs._id, this.blogs).subscribe(data => {
      console.log(data);
    })
  }

  interactingadd(inp) {
    if (this.interact.InteractionType != "") {
      this.interact.timestamp = new Date();
      this.interact.InteractionType = inp;
      this.blogs.interactionIdList.push(this.interact);
      this.blogService.updateBlog(this.blogs._id, this.blogs).subscribe(data => {
        console.log(data);
      });;
    }
    else {
      //console.log("interaction func else");
      this.interact.timestamp = new Date();
      this.interact.InteractionType = inp;
      //console.log("interaction func else2");

      this.blogs.interactionIdList.push(this.interact);
      this.blogService.updateBlog(this.blogs._id, this.blogs).subscribe(data => {
        console.log(data);
      });;
      //console.log(this.blogs.interactionIdList);
    }
  }

  interactingupdate(inp) {
    if (this.interact.InteractionType != "") {
      var aa = this.findingindex();
      if (aa >= 0) {
        this.blogs.interactionIdList[aa].InteractionType = inp;
        this.blogs.interactionIdList[aa].timestamp = new Date();
        this.blogService.updateBlog(this.blogs._id, this.blogs).subscribe(data => {
          console.log(data);
        });;
      }
    }
    else {
      var a = this.blogs.interactionIdList.indexOf(a => a.userId == this.userdetials.id);
      this.blogs.interactionIdList[a].InteractionType = inp;
      this.blogs.interactionIdList[a].timestamp = new Date();
      this.blogService.updateBlog(this.blogs._id, this.blogs).subscribe(data => {
        console.log(data);
      });;

    }
  }



  getblogbyid() {
    this.route.params.subscribe(param => {
      //console.log(param['id'])
    });
    var a;
    this.route.params.subscribe(async param => {
      this.blogService.getBlog(param['id']).subscribe(data => {
        //console.log(data);
        this.blogs = data["data"];
      })
    })
  }
  commentAdd() {
    this.authcheck();

    this.commentMake();
    this.comment.content = this.commentContent;
    this.comment.datePublished = new Date();

    var a;
    //console.log(this.comment, "here");
    this.newcommentid = "";
    this.commentService.addComments(this.comment).subscribe(res => {
      //console.log(res, "dv");
      this.newcommentid = res['data'];
    });
    this.newcomment = 0;
    this.commentContent = "";

  }
  commentDelete(inp, inp2) {
    if (inp2.commentorId == this.userID || this.boss == 0) {
      this.commentService.deleteComment(inp).subscribe(res => { console.log(res) });
      this.blogs.commentsIdList.splice(this.blogs.commentsIdList.indexOf(inp), 1);
      this.blogService.updateBlog(this.blogs._id, this.blogs).subscribe(data => {
        console.log(data);
      });
      this.commentlist.splice(this.commentlist.indexOf(this.commentlist.find(a => a._id == inp)), 1);
      //console.log(inp, "this is inp");
      this.snackBar.open("Comment Deleted Successfully", null, {
        duration: 2000,
        panelClass: ['success-snackbar'],
        horizontalPosition: 'right',
        verticalPosition: 'top'
      });
    }
  }
  commentMake() {
    this.comment.commentorId = this.userdetials.id;
    this.comment.commentorUserName = this.userdetials.username;
    this.comment.dislikes = 0;
    this.comment.likes = 0;
    this.comment.reportsCounter = 0;
    // console.log(this.userdetials.avatar, "this is avatar");
    this.comment.Avatar = this.userdetials.avatar;

  }

  getCommentbyid() {
    if (this.blogs.commentsIdList) {
      for (let Key in this.blogs.commentsIdList) {
        this.commentService.getCommentbyid(this.blogs.commentsIdList[Key]).subscribe(data => { this.commentlist.push(data["data"]); })
      }
    }
    else {
      //console.log("no comments found")
    }
  }

  findingindex(): number {
    for (var i = 0; i < this.blogs.interactionIdList.length; i++) {
      if (this.blogs.interactionIdList[i].userId == this.userdetials.id) {
        return i;
      }
    }
    return -1;
  }

  logout() {
    this.AuthService.logout();
  }
  dateset() {
    this.date = this.blogs.dateSubmitted.toString();
    this.date = (this.date.split("T")[0]);
    var a = this.date.split("-");
    this.date = "";
    this.date = a[2] + "-" + a[1] + "-" + a[0];
    //console.log(this.date, "date");
  }
  authcheck() {

    //console.log(this.router.url)
    const currentUser = this.AuthService.currentUserValue;
    if (currentUser) {
      return true;
    }
    this.router.navigate(['login'], { queryParams: { returnUrl: this.router.url } });


    return false;
  }

}


