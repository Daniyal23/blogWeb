import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Comment } from 'src/app/models/comments';
import { Interaction } from 'src/app/models/interaction';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { CommentsService } from 'src/app/services/comments.service';
import { ConfirmDialogComponent, ConfirmDialogModel } from '../../confirmation-dialog/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {
  @Input() comment: any;
  constructor(private AuthService: AuthenticationService
    , private commentService: CommentsService,
    private snackBar: MatSnackBar,
    public dialog: MatDialog,
    private cdr: ChangeDetectorRef,
    private router: Router,) { }
  public date: string = "";
  public htmlcontent = "";
  public edit = 0;
  public showedit = 0;
  public userdetials: any;
  public reportComment = 0;
  public dislikedComment = 0;
  public likedComment = 0;
  public changeLike = 0;



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

    this.dateset();
    this.userdetials = this.AuthService.parseJwt(localStorage.getItem("currentUser"));

    if (this.comment.commentorId == this.userdetials.id) {
      this.edit = 0;
      this.showedit = 1;
      this.htmlcontent = this.comment.content;
    }
  }
  public done = 0;
  ngAfterViewChecked() {
    if (this.comment && this.done == 0) {


      // this.interact.InteractionType = "";
      if (this.comment.reportlistList == undefined) {
        this.comment.reportlistList = [];
      }
      else {
        var a = this.comment.reportlistList.find(a => a.userId == this.userdetials.id);
        if (a) {
          this.reportComment = 1;
        }
      }

      if (this.comment.interactionList) {
        if (this.comment.interactionList.length == 0) {
          this.comment.interactionList = [];
          //console.log("interaction list rein")
        }
        else {
          //console.log("in eleeee");
          var a = this.comment.interactionList.find(a => a.userId == this.userdetials.id);
          // console.log(a, "fy a");
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
        this.comment.interactionList = [];
      }


    }


    this.cdr.detectChanges();
  }

  dateset() {
    //console.log(this.comment.datePublished.toString());
    this.date = this.comment.datePublished.toString();
    this.date = (this.date.split("T")[0]);
    var a = this.date.split("-");
    this.date = "";
    this.date = a[2] + "-" + a[1] + "-" + a[0];
    // console.log(this.date, "date");
  }

  onedit() {
    // console.log("in edit", this.htmlcontent)
    if (this.edit == 0) {
      this.edit = 1
    }
    else {
      this.comment.content = this.htmlcontent;
      //console.log(this.comment._id, "w");
      this.commentService.updateComment(this.comment._id, this.comment).subscribe(data => {
        console.log(data);
      });;
      this.edit = 0;
    }
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
  public disliked = 0;
  public liked = 0;
  nbrCommentLike() {
    this.authcheck();

    if (this.comment.interactionList == undefined) {
      this.comment.interactionList = [];
    }

    //////////////////////////////////
    this.changeLike = 0;

    if (this.disliked == 1 && this.liked == 0) {
      this.disliked = 0;
      this.comment.dislikes = this.comment.dislikes - 1;
      this.comment.likes = this.comment.likes + 1;
      this.liked = 1;

      this.interactingupdate("Like");
    }
    else if (this.liked == 0 && this.disliked == 0) {
      this.comment.likes = this.comment.likes + 1;
      this.liked = 1;

      this.interactingadd("Like");
    }
    else {

      this.comment.likes = this.comment.likes - 1;
      this.liked = 0;
      this.changeLike = 1;

      this.comment.interactionList.splice(this.comment.interactionList.indexOf(a => a.userid == this.userdetials.id));
      this.commentService.updateComment(this.comment._id, this.comment).subscribe(data => {
        console.log(data);
      });;
    }

  }

  nbrCommentDislike() {
    this.authcheck();
    if (this.comment.interactionList == undefined) {
      this.comment.interactionList = [];
    }
    //////////////////////////////////

    if (this.disliked == 0 && this.liked == 0) {
      this.comment.dislikes = this.comment.dislikes + 1;
      this.disliked = 1;
      this.interactingadd("Dislike");
    }
    else if (this.liked == 1 && this.disliked == 0) {
      this.liked = 0;
      this.comment.likes = this.comment.likes - 1;
      this.comment.dislikes = this.comment.dislikes + 1;
      this.disliked = 1;
      this.interactingupdate("Dislike");
    }

    else {
      this.comment.dislikes = this.comment.dislikes - 1;
      this.disliked = 0;

      this.comment.interactionList.splice(this.comment.interactionList.indexOf(a => a.userId == this.userdetials.id));
      this.commentService.updateComment(this.comment._id, this.comment).subscribe(data => {
        console.log(data);
      });;
    }
  }


  nbrreport() {
    this.authcheck();
    if (this.comment.reportlistList == undefined) {
      this.comment.reportlistList = [];
    }

    this.reportComment = 1;
    this.comment.reportsCounter += 1;
    this.reports.InteractionType = "report";
    this.reports.blogId = this.comment._id;
    this.reports.timestamp = new Date();
    this.reports.userId = this.userdetials.id;
    this.comment.reportlistList.push(this.reports);
    this.commentService.updateComment(this.comment._id, this.comment).subscribe(data => {
      console.log(data);
    });
  }

  nbrDeReport() {
    this.authcheck();

    this.reportComment = 0;
    this.comment.reportsCounter -= 1;
    this.comment.reportlistList.splice(a => a.userId == this.userdetials.id);
    this.commentService.updateComment(this.comment._id, this.comment).subscribe(data => {
      console.log(data);
    })
  }



  public interact: Interaction = new Interaction();
  public reports: Interaction = new Interaction();

  interactingadd(inp) {
    if (this.interact.InteractionType != "") {
      this.interact.blogId = this.comment._id;
      this.interact.userId = this.comment.commentorId;

      this.interact.timestamp = new Date();
      this.interact.InteractionType = inp;
      //console.log("this.interact", this.interact);
      this.comment.interactionList.push(this.interact);
      this.commentService.updateComment(this.comment._id, this.comment).subscribe(data => {
        console.log(data);
      });;
    }
    else {
      //console.log("interaction func else");

      this.interact.blogId = this.comment._id;
      this.interact.userId = this.comment.commentorId;

      this.interact.timestamp = new Date();
      this.interact.InteractionType = inp;
      //console.log("interaction func else2");
      //console.log("this.interact", this.interact);
      this.comment.interactionList.push(this.interact);
      this.commentService.updateComment(this.comment._id, this.comment).subscribe(data => {
        console.log(data);
      });;
      //console.log(this.comment.interactionList);
    }
  }
  findingindex(): number {
    for (var i = 0; i < this.comment.interactionList.length; i++) {
      if (this.comment.interactionList[i].userId == this.userdetials.id) {
        return i;
      }
    }
    return -1;
  }

  interactingupdate(inp) {
    if (this.interact.InteractionType != "") {
      var aa = this.findingindex();
      if (aa >= 0) {
        this.comment.interactionList[aa].InteractionType = inp;
        this.comment.interactionList[aa].timestamp = new Date();
        //console.log("this.interact1", this.interact);
        this.commentService.updateComment(this.comment._id, this.comment).subscribe(data => {
          console.log(data);
        });;
      }
    }
    else {
      var a = this.comment.interactionList.indexOf(a => a.userId == this.userdetials.id);
      this.comment.interactionList[a].InteractionType = inp;
      this.comment.interactionList[a].timestamp = new Date();
      //console.log("this.interact2", this.interact);
      this.commentService.updateComment(this.comment._id, this.comment).subscribe(data => {
        console.log(data);
      });;

    }
  }
}
