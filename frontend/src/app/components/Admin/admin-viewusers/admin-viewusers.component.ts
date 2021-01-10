import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { NgModel } from '@angular/forms';
import { Blog } from 'src/app/models/blog';
import { User } from 'src/app/models/users';
import { BlogService } from 'src/app/services/blog.service';
import { CommentsService } from 'src/app/services/comments.service';
import { UserService } from 'src/app/services/user.service';
import { Comment } from 'src/app/models/comments'
import { AuthenticationService } from 'src/app/services/authentication.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

class userInfo {
  noLikes: number = 0;
  noDislikes: number = 0;
  noBlogs: number = 0;
  noReports: number = 0;
  status: string = "";
  userName: string = "";
  role: string = "";
  noComments: number = 0;
  accountType: string = "";
  _id: number = 0;
}

class forcheckbox {
  text: string;
  selected: number;
}

export interface DialogData {
  comment: string;
}

@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: 'dialog-overview-example-dialog.html',
})
export class DialogOverviewExampleDialogforAllComments {

  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialogforAllComments>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

    onNoClick(inp): void {
      this.dialogRef.close('No');
    }
    onYesClick(inp): void {
      this.dialogRef.close('Yes');
    }

}



@Component({
  selector: 'app-admin-viewusers',
  templateUrl: './admin-viewusers.component.html',
  styleUrls: ['./admin-viewusers.component.css']
})





export class AdminViewusersComponent implements OnInit {

  public users: User[] = [];
  public user: any[] = [];
  public blogs: Blog[] = [];
  public comments: Comment[] = [];

  public usertype: any;
  constructor(
    public userService: UserService,
    public blogService: BlogService,
    public commentService: CommentsService,
    private AuthService: AuthenticationService,
    private cdr: ChangeDetectorRef,
    public dialog: MatDialog,
    private snackBar: MatSnackBar,
  ) { }
  public userInfolist: Array<userInfo> = [];
  public forcheckBox: Array<forcheckbox> = [];
  public forcheck: forcheckbox = new forcheckbox();
  public forcheck1: forcheckbox = new forcheckbox();
  public forcheck2: forcheckbox = new forcheckbox();
  public yoy: true;
  public yoy1: false;

 
  public moderator: number = 0;
  public blogger: number = 0;
  public regular: number = 0;

  public check = 0;

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

    this.getusers();
    this.getblogs();
    this.getcomments();


  }
  ngAfterViewChecked() {
    if (this.user.length > 0 && this.blogs.length > 0 && this.check == 0) {
      this.user.splice(this.user.findIndex(a => a._id == this.AuthService.getuserdetails().id), 1);
      this.user = this.user.filter(a => a.status != 'blocked');
      this.populate();
      this.check = 1;
      //console.log(this.user, " users");
    }
    if (this.comments.length > 0) {
      // console.log(this.comments, "commentns");
    }
    if (this.blogs.length > 0) {
      //console.log(this.blogs,"blogs");
    }
    this.cdr.detectChanges();
  }

  getusers() {
    this.userService.getAllUsers().subscribe(data => {
      this.user = data;

    })
    //  console.log("hello");
    this.user.forEach(value => {
      //   console.log(value, 'daasd')
    })
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
  getcomments() {
    this.commentService.getAllComments().subscribe(data => {
      this.comments = data;
    })
    this.comments.forEach(value => {
      //console.log(value, "get comment")
    })
  }
  populate() {

    for (var i = 0; i < this.user.length; i++) {
      this.userInfolist[i] = new userInfo();
      this.userInfolist[i].userName = this.user[i].UserName;
      this.userInfolist[i].status = this.user[i].status;
      this.userInfolist[i].accountType = this.user[i].accountType;
      this.userInfolist[i]._id = this.user[i]._id;

      //      this.userInfolist[i].status = "mod"
      if(this.blogs.length<=0){
        this.userInfolist[i].noBlogs=0;
      }
      else{
      this.userInfolist[i].noBlogs = this.blogs.filter(a => a.creatorId == this.user[i]._id).length;

      // console.log(this.blogs[i].interactionIdList.filter(a=> a.userId==this.user[i]._id).length,"this is it")
      
      this.blogs.forEach(value => {
        if (value.interactionIdList) {
          this.userInfolist[i].noLikes += value.interactionIdList.filter(a => a.userId == this.user[i]._id && a.InteractionType == "Like").length;
          this.userInfolist[i].noDislikes += value.interactionIdList.filter(a => a.userId == this.user[i]._id && a.InteractionType == "Dislike").length;
          this.userInfolist[i].noReports += value.interactionIdList.filter(a => a.userId == this.user[i]._id && a.InteractionType == "Report").length;
        }
        else{
          console.log("No blogs");
        }
      })
    }
      this.fillcheckboxlist(i, this.user[i].accountType);
      if(this.comments.length>0){
      this.userInfolist[i].noComments = this.comments.filter(a => a.commentorId == this.user[i]._id).length;
    }

    }

    // console.log(this.userInfolist, "user infos");
  }
  statusUp(inp, inp2) {
    console.log(inp, inp2);
    this.userInfolist[this.userInfolist.findIndex(a => a.userName == inp2)].status = inp;
    //this.user[this.user.findIndex(a=> a.userName==inp2)].status=inp

  }

  fillcheckboxlist(index, name) {

    if (name == "moderator") {
      this.moderator = 1;
      this.blogger = 0;
      this.regular = 0;
    }
    else if (name == "blogger") {
      this.blogger = 1;
      this.regular = 0;
      this.moderator = 0;
    }
    else {
      this.regular = 1;
      this.blogger = 0;
      this.regular = 0;

    }

  }
  updateAccount(inp, inp2) {
    console.log(inp, inp2, "here");
    this.user[this.user.findIndex(a => a._id == inp)].accountType = inp2;
    this.userService.updateUser(this.user[this.user.findIndex(a => a._id == inp)]._id, this.user[this.user.findIndex(a => a._id == inp)]).subscribe(data => {
      console.log(data);
    });
    this.userInfolist[this.userInfolist.findIndex(a => a._id == inp)].accountType = inp2;

  }
  //   onSelectionChange(entry) {
  //     this.selectedEntry = entry;
  // }
  block(inp) {
    //console.log(inp, this.user.findIndex(a => a._id == inp))
    this.user[this.user.findIndex(a => a._id == inp)].status = "blocked";
    //console.log(this.user);
    this.userService.updateUser(inp, this.user.find(a => a._id == inp)).subscribe(data => {
      console.log(data);
    });
  }
  delete(inp) {
    this.user = this.user.filter(a => a._id != inp);
    this.userInfolist = this.userInfolist.filter(a => a._id != inp);
    this.userService.deleteUsers(inp).subscribe(data => {
      console.log(data);
    });
  }
}


