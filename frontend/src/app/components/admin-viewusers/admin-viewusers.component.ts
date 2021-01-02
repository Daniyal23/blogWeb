import { Component, OnInit } from '@angular/core';
import { NgModel } from '@angular/forms';
import { Blog } from 'src/app/models/blog';
import { User } from 'src/app/models/users';
import { BlogService } from 'src/app/services/blog.service';
import { CommentsService } from 'src/app/services/comments.service';
import { UserService } from 'src/app/services/user.service';
import { Comment } from 'src/app/models/comments'

class userInfo {
  noLikes: number = 0;
  noDislikes: number = 0;
  noBlogs: number = 0;
  noReports: number = 0;
  status: string;
  userName: string;
  role: string;
  noComments: number = 0;
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
  constructor(
    public userService: UserService,
    public blogService: BlogService,
    public commentService: CommentsService
  ) { }
  public userInfolist: Array<userInfo> = [];

  ngOnInit(): void {
    this.getusers();
    this.getblogs();
    this.getcomments();


  }
  ngAfterViewChecked() {
    if (this.user.length > 0 && this.blogs.length > 0) {
      this.populate();
      console.log(this.user, " users");
    }
    if (this.comments.length > 0) {
      // console.log(this.comments, "commentns");
    }
    if (this.blogs.length > 0) {
      //console.log(this.blogs,"blogs");
    }
  }

  getusers() {
    this.userService.getAllUsers().subscribe(data => {
      this.user = data;

    })
    console.log("hello");
    this.user.forEach(value => {
      console.log(value, 'daasd')
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
      this.userInfolist[i].role = "User";
      this.userInfolist[i].status = "undefined"
      this.userInfolist[i].noBlogs = this.blogs.filter(a => a.creatorId == this.user[i]._id).length;
      // console.log(this.blogs[i].interactionIdList.filter(a=> a.userId==this.user[i]._id).length,"this is it")

      this.blogs.forEach(value => {
        if (value.interactionIdList) {
          this.userInfolist[i].noLikes += value.interactionIdList.filter(a => a.userId == this.user[i]._id && a.InteractionType == "Like").length;
          this.userInfolist[i].noDislikes += value.interactionIdList.filter(a => a.userId == this.user[i]._id && a.InteractionType == "Dislike").length;
          this.userInfolist[i].noReports += value.interactionIdList.filter(a => a.userId == this.user[i]._id && a.InteractionType == "Report").length;
        }
      })

      this.userInfolist[i].noComments = this.comments.filter(a => a.commentorId == this.user[i]._id).length;

    }
    console.log(this.userInfolist, "user infos");
  }
  statusUp(inp, inp2) {
    console.log(inp, inp2);
    this.userInfolist[this.userInfolist.findIndex(a => a.userName == inp2)].status = inp;
    //this.user[this.user.findIndex(a=> a.userName==inp2)].status=inp

  }
}

