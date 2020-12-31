import { Component, OnInit } from '@angular/core';
import { Blog } from 'src/app/models/blog';
import { Comment } from 'src/app/models/comments'
import { DomSanitizer } from '@angular/platform-browser';

import { AngularEditorConfig } from '@kolkov/angular-editor';
import { fakeAsync } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { BlogService } from 'src/app/services/blog.service';
import { InteractionService } from 'src/app/services/interaction.service';

import { Interaction } from 'src/app/models/interaction';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { CommentsService } from 'src/app/services/comments.service';
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
    private interactionService: InteractionService,
    private AuthService: AuthenticationService,
    private commentService: CommentsService,

  ) { }
  public blogs?;
  public img: any;
  public imgsrcs: Array<any> = [];
  public interact: Interaction = new Interaction();
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

  public liked = 0;
  public disliked = 0;

  public changeLike = 0;
  public changedisLike = 0;

  public interactionlistindex = 0;




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






  ngOnInit(): void {
    this.getblogbyid();
    this.userdetials = this.AuthService.parseJwt(localStorage.getItem("currentUser"));
    //console.log(this.userdetials);
    //console.log(this.userdetials.id);



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

      this.interact.blogId = this.blogs._id;
      this.interact.userId = this.userdetials.id;
      this.interact.InteractionType = "";
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
      this.blogs.commentsIdList.push(this.newcommentid);
      this.newcomment = 1;
      this.blogService.updateBlog(this.blogs._id, this.blogs);
    }
  }

  nbrLike() {
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
      this.blogService.updateBlog(this.blogs._id, this.blogs);
    }

  }
  nbrDislike() {
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
      this.blogService.updateBlog(this.blogs._id, this.blogs);
    }
  }

  interactingadd(inp) {
    if (this.interact.InteractionType != "") {
      this.interact.timestamp = new Date();
      this.interact.InteractionType = inp;
      this.blogs.interactionIdList.push(this.interact);
      this.blogService.updateBlog(this.blogs._id, this.blogs);
    }
    else {
      //console.log("interaction func else");
      this.interact.timestamp = new Date();
      this.interact.InteractionType = inp;
      //console.log("interaction func else2");

      this.blogs.interactionIdList.push(this.interact);
      this.blogService.updateBlog(this.blogs._id, this.blogs);
      //console.log(this.blogs.interactionIdList);
    }
  }

  interactingupdate(inp) {
    if (this.interact.InteractionType != "") {
      var aa = this.findingindex();
      if (aa >= 0) {
        this.blogs.interactionIdList[aa].InteractionType = inp;
        this.blogs.interactionIdList[aa].timestamp = new Date();
        this.blogService.updateBlog(this.blogs._id, this.blogs);
      }
    }
    else {
      var a = this.blogs.interactionIdList.indexOf(a => a.userId == this.userdetials.id);
      this.blogs.interactionIdList[a].InteractionType = inp;
      this.blogs.interactionIdList[a].timestamp = new Date();
      this.blogService.updateBlog(this.blogs._id, this.blogs);

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
        this.blogs = data;
      })
    })
  }
  commentAdd() {
    this.commentMake();
    this.comment.content = this.commentContent;
    this.comment.datePublished = new Date();

    var a;
    this.commentService.addComments(this.comment).subscribe(res => { this.newcommentid = res.toString() });
    this.newcomment = 0;

    this.commentlist.push(this.comment);

  }

  commentMake() {
    this.comment.commentorId = this.userdetials.id;
    this.comment.dislikes = 0;
    this.comment.likes = 0;
    this.comment.reportsCounter = 0;
    this.comment.title = "Comment";

  }

  getCommentbyid() {
    if (this.blogs.commentsIdList) {
      for (let Key in this.blogs.commentsIdList) {
        this.commentService.getCommentbyid(this.blogs.commentsIdList[Key]).subscribe(data => { this.commentlist.push(data); })
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
}


