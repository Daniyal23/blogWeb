import { Component, OnInit } from '@angular/core';
import { Blog } from 'src/app/models/blog';
import { Comments } from 'src/app/models/comments'
import { DomSanitizer } from '@angular/platform-browser';

import { AngularEditorConfig } from '@kolkov/angular-editor';
import { fakeAsync } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { BlogService } from 'src/app/services/blog.service';
@Component({
  selector: 'app-blog-details',
  templateUrl: './blog-details.component.html',
  styleUrls: ['./blog-details.component.css']
})
export class BlogDetailsComponent implements OnInit {
  comments = Comments;// Passing the data here (Comments is an arrayy of comments) pass data in this var to display
  constructor(private sanitizer: DomSanitizer, private route: ActivatedRoute, private blogService: BlogService) { }
  public blogs?;
  public img: any;
  public imgsrcs: Array<any> = [];

  bckColor = 'white'
  name = 'Angular 6';
  htmlContent = '';
  userdetials: any;


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


  }
  ngAfterViewChecked() {
    if (this.blogs) {
      // console.log("if prop2", this.property, "sadasda ", this.checkingvar);
      console.log(this.blogs);
      // var Blogs = localStorage.getItem('blog');
      // this.blogs = JSON.parse(Blogs);
      // //this.img = (this.sanitizer.bypassSecurityTrustUrl(this.blogs.blogHeaderImage[0]));

      for (let key in this.blogs.blogHeaderImage) {
        console.log("here");
        this.blogs.blogHeaderImage[key] = this.sanitizer.bypassSecurityTrustUrl(key);
        this.imgsrcs.push(this.sanitizer.bypassSecurityTrustUrl(key));

      }
      this.img = this.imgsrcs[this.imgsrcs.length - 1];
      console.log(this.img);
      this.htmlContent = this.blogs.text;
    }
  }

  nbrL() {
    if (this.bckColor == 'white') {
      this.blogs.numLikes = this.blogs.numLikes + 1;
      this.bckColor = 'green';

    }
    else {
      this.bckColor = 'white';
      this.blogs.numLikes = this.blogs.numLikes - 1;


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


