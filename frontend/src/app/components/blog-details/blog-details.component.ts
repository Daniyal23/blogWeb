import { Component, OnInit } from '@angular/core';
import { Blog } from 'src/app/models/blog';
import { Comments } from 'src/app/models/comments'
import { DomSanitizer } from '@angular/platform-browser';

import { AngularEditorConfig } from '@kolkov/angular-editor';
import { fakeAsync } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { BlogService } from 'src/app/services/blog.service';
import { InteractionService } from 'src/app/services/interaction.service';

import { Interaction } from 'src/app/models/interaction';
import { AuthenticationService } from 'src/app/services/authentication.service';
@Component({
  selector: 'app-blog-details',
  templateUrl: './blog-details.component.html',
  styleUrls: ['./blog-details.component.css']
})
export class BlogDetailsComponent implements OnInit {
  comments = Comments;// Passing the data here (Comments is an arrayy of comments) pass data in this var to display
  constructor(private sanitizer: DomSanitizer,
    private route: ActivatedRoute,
    private blogService: BlogService,
    private interactionService: InteractionService,
    private AuthService: AuthenticationService,

  ) { }
  public blogs?;
  public img: any;
  public imgsrcs: Array<any> = [];
  public interact: Interaction = new Interaction();

  bckColor = 'white'
  name = 'Angular 6';
  htmlContent = '';
  userdetials: any;
  public done = 0;

  public liked = 0;
  public disliked = 0;

  public changeLike = 0;
  public changedisLike = 0;


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
    this.getbyid();
    this.userdetials = this.AuthService.parseJwt(localStorage.getItem("currentUser"));
    console.log(this.userdetials);
    console.log(this.userdetials.id);



  }
  ngAfterViewChecked() {
    if (this.blogs && this.done == 0) {

      console.log(this.blogs);
      for (let key in this.blogs.blogHeaderImage) {
        console.log("here");
        this.blogs.blogHeaderImage[key] = this.sanitizer.bypassSecurityTrustUrl(key);
        this.imgsrcs.push(this.sanitizer.bypassSecurityTrustUrl(key));

      }
      this.img = this.imgsrcs[this.imgsrcs.length - 1];
      console.log(this.img);
      this.htmlContent = this.blogs.text;
      this.done = 1;

      this.interact.blogId = this.blogs._id;
      this.interact.userId = this.userdetials.id;
      this.interact.InteractionType = "";
    }
  }

  nbrLike() {
    this.changeLike = 0;
    console.log("in like");
    if (this.liked == 0) {
      this.blogs.numLikes = this.blogs.numLikes + 1;
      this.liked = 1;
      if (this.disliked == 1) {
        this.disliked = 0;
        this.blogs.numDislikes = this.blogs.numDislikes - 1;
      }
      this.interacting("Like");
    }
    else {
      this.bckColor = 'white';
      this.blogs.numLikes = this.blogs.numLikes - 1;
      this.liked = 0;
      this.changeLike = 1;
    }

  }
  nbrDislike() {
    console.log("in dislike");
    if (this.disliked == 0) {
      this.blogs.numDislikes = this.blogs.numDislikes + 1;
      //this.bckColor = 'green';
      this.disliked = 1;

      if (this.liked == 1) {
        this.liked = 0;
        this.blogs.numLikes = this.blogs.numLikes - 1;
      }
      this.interacting("Like");
    }
    else {
      //this.bckColor = 'white';
      this.blogs.numDislikes = this.blogs.numDislikes - 1;
      this.disliked = 0;


    }
  }

  interacting(inp) {
    if (this.interact.InteractionType != "") {
      console.log("interaction func if");
    }
    else {
      console.log("interaction func else");
      this.interact.timestamp = new Date();
      this.interact.InteractionType = inp;
      this.interactionService.addInteraction(this.interact);
    }


  }

  getbyid() {
    this.route.params.subscribe(param => {
      console.log(param['id'])
    });
    var a;
    this.route.params.subscribe(async param => {
      this.blogService.getBlog(param['id']).subscribe(data => {
        console.log(data);
        this.blogs = data;
      })
      //return a;


      //console.log(this.propertyService.getProperty(param['id']), " ;lj");
    })
  }

}


