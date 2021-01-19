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
import { ConfirmDialogComponent, ConfirmDialogModel } from '../../confirmation-dialog/confirm-dialog/confirm-dialog.component';
import { FilterDialogComponent, FilterDialogModel } from '../../confirmation-dialog/filter-dialog/filter-dialog.component';
import { SearchDialogComponent, SearchDialogModel } from '../../confirmation-dialog/search-dialog/search-dialog.component';

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

@Component({
  selector: 'app-admin-viewusers',
  templateUrl: './admin-viewusers.component.html',
  styleUrls: ['./admin-viewusers.component.css']
})


export class AdminViewusersComponent implements OnInit {

  //public users: User[] = [];
  public user: any[];
  public blogs: Blog[];
  public comments: Comment[];
  public loading=false;

  public usertype: any;
  constructor(
    public userService: UserService,
    public blogService: BlogService,
    public commentService: CommentsService,
    private AuthService: AuthenticationService,
    private cdr: ChangeDetectorRef,
    private snackBar: MatSnackBar,
    public dialog: MatDialog
  ) { }
  public userInfolist: Array<userInfo> = [];
  public userInfolistmain: Array<userInfo> = [];

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

  confirmDialog(inp1, inp2): void {
    const message = 'Are you sure you want to ' + inp2 + ' this User?';

    const dialogData = new ConfirmDialogModel("Confirm Action", message);

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: "400px",
      data: dialogData
    });

    dialogRef.afterClosed().subscribe(dialogResult => {
      //console.log(dialogResult);


      if (dialogResult == true) {
        if (inp2 == "delete") {
          this.delete(inp1);
          this.snackBar.open("Deleted successfully", null, {
            duration: 2000,
            panelClass: ['success-snackbar'],
            horizontalPosition: 'right',
            verticalPosition: 'top'
          });
        }
        else {
          this.block(inp1);
          this.snackBar.open("Blocked successfully", null, {
            duration: 2000,
            panelClass: ['success-snackbar'],
            horizontalPosition: 'right',
            verticalPosition: 'top'
          });
        }
      }
      else {

      }
    });
  }

  public filtered: string = "";

  filterDialog(): void {
    const message = ['No of Blogs',

      'No of Comments',

      'No of Likes',

      'No of Dislikes',

      'No of Reports'];

    const dialogData = new FilterDialogModel(this.filtered, message);

    const dialogRef = this.dialog.open(FilterDialogComponent, {
      maxWidth: "400px",
      data: dialogData
    });

    dialogRef.afterClosed().subscribe(dialogResult => {
      //console.log(dialogResult);
      if (dialogResult != false) {
        if (dialogResult == "No of Blogs") {
          //console.log("in blogs");
          this.filtered = dialogResult;
          this.userInfolist.sort((a, b) => b.noBlogs - a.noBlogs);
        }
        else if (dialogResult == 'No of Likes') {
          //console.log("in likes");
          this.filtered = dialogResult;

          this.userInfolist.sort((a, b) => b.noLikes - a.noLikes);

        }
        else if (dialogResult == 'No of Dislikes') {
          this.filtered = dialogResult;

          this.userInfolist.sort((a, b) => b.noDislikes - a.noDislikes);

        }
        else if (dialogResult == 'No of Reports') {
          this.filtered = dialogResult;

          this.userInfolist.sort((a, b) => b.noReports - a.noReports);

        }
        else if (dialogResult == 'No of Comments') {
          this.filtered = dialogResult;

          this.userInfolist.sort((a, b) => b.noComments - a.noComments);

        }
      }

    });
  }


  public searched: string = "";
  public searchtext: string = "";


  searchDialog(): void {
    const message = ['username'];

    const dialogData = new SearchDialogModel(this.searched, message, this.searchtext);

    const dialogRef = this.dialog.open(SearchDialogComponent, {
      maxWidth: "400px",
      data: dialogData
    });

    dialogRef.afterClosed().subscribe(dialogResult => {
      //console.log(dialogResult);
      if (dialogResult != false) {
        if (dialogResult[0] == "username") {
          this.userInfolistmain = this.userInfolist;
          this.userInfolist = this.userInfolist.filter(a => a.userName.toLowerCase().includes(dialogResult[1]));
          this.searched = "true";
        }

      }

    });
  }
  searchreset() {
    this.userInfolist = this.userInfolistmain;
    this.searched = 'false';
  }



  ngOnInit(): void {
    this.loading=true;
    this.AuthService.checkaccessblogger();
    this.AuthService.checkaccessmoderator();
    this.AuthService.checkaccessregular();

    this.getusers();
    this.getblogs();
    this.getcomments();


  }
  ngAfterViewChecked() {
    if (this.user != undefined && this.blogs != undefined && this.comments != undefined && this.check == 0) {
      this.user.splice(this.user.findIndex(a => a._id == this.AuthService.getuserdetails().id), 1);

      this.user = this.user.filter(a => a.status != 'blocked');
      this.populate();
      this.check = 1;

      this.loading=false;
      //console.log(this.user, " users");
    }

    this.cdr.detectChanges();
  }

  getusers() {
    this.userService.getAllUsers().subscribe(data => {
      this.user = data["data"];
      console.log(data);
      // this.users = data["data"];

    })

  }
  getblogs() {
    this.blogService.getAllBlogs().subscribe(data => {
      this.blogs = data["data"];
      console.log(data);
    })


  }
  getcomments() {
    this.commentService.getAllComments().subscribe(data => {
      this.comments = data["data"];
      console.log(data);
    })

  }
  populate() {

    for (var i = 0; i < this.user.length; i++) {
      //console.log(this.user)
      this.userInfolist[i] = new userInfo();
      this.userInfolist[i]._id = this.user[i]._id;
      this.userInfolist[i].userName = this.user[i].UserName;
      this.userInfolist[i].status = this.user[i].status;
      this.userInfolist[i].accountType = this.user[i].accountType;


      //      this.userInfolist[i].status = "mod"
      if (this.blogs.length <= 0) {
        this.userInfolist[i].noBlogs = 0;
      }
      else {
        this.userInfolist[i].noBlogs = this.blogs.filter(a => a.creatorId == this.user[i]._id).length;

        // console.log(this.blogs[i].interactionIdList.filter(a=> a.userId==this.user[i]._id).length,"this is it")

        this.blogs.forEach(value => {
          if (value.interactionIdList) {
            this.userInfolist[i].noLikes += value.interactionIdList.filter(a => a.userId == this.user[i]._id && a.InteractionType == "Like").length;
            this.userInfolist[i].noDislikes += value.interactionIdList.filter(a => a.userId == this.user[i]._id && a.InteractionType == "Dislike").length;
            this.userInfolist[i].noReports += value.interactionIdList.filter(a => a.userId == this.user[i]._id && a.InteractionType == "Report").length;
          }
          else {
            //console.log("No blogs");
          }
        })
      }
      this.fillcheckboxlist(i, this.user[i].accountType);
      this.userInfolist[i].noComments = this.comments.filter(a => a.commentorId == this.user[i]._id).length;

    }

    // console.log(this.userInfolist, "user infos");
  }
  statusUp(inp, inp2) {
    //console.log(inp, inp2);
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
    // console.log(inp, "here");
    //console.log(this.userInfolist, "userinfolist");
    //console.log(this.user);
    //console.log(this.users);
    //console.log(this.users.findIndex(a => a.id == inp));
    this.user[this.user.findIndex(a => a._id == inp)].accountType = inp2;
    // console.log('1');
    this.userService.updateUser(this.user[this.user.findIndex(a => a._id == inp)]._id, this.user[this.user.findIndex(a => a._id == inp)]).subscribe(data => {
      console.log(data);
    });
    //console.log('1');
    this.userInfolist[this.userInfolist.findIndex(a => a._id == inp)].accountType = inp2;

  }
  //   onSelectionChange(entry) {
  //     this.selectedEntry = entry;
  // }
  block(inp) {
    //console.log(inp, this.user.findIndex(a => a._id == inp))
    this.user[this.user.findIndex(a => a._id == inp)].status = "blocked";
    this.userInfolist.splice(this.userInfolist.findIndex(a => a._id == inp), 1)
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




