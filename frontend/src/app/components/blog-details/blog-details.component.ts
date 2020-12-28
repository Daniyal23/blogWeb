import { Component, OnInit } from '@angular/core';
import { Blog } from 'src/app/models/blog';
import { Comments } from 'src/app/models/comments'
import { DomSanitizer } from '@angular/platform-browser';

import { AngularEditorConfig } from '@kolkov/angular-editor';
import { fakeAsync } from '@angular/core/testing';
@Component({
  selector: 'app-blog-details',
  templateUrl: './blog-details.component.html',
  styleUrls: ['./blog-details.component.css']
})
export class BlogDetailsComponent implements OnInit {
  comments = Comments;// Passing the data here (Comments is an arrayy of comments) pass data in this var to display
  constructor(private sanitizer: DomSanitizer, ) { }
  public blogs: Blog = new Blog();
  public img: any;
  public imgsrcs: Array<any> = [];


  name = 'Angular 6';
  htmlContent = '';
  userdetials: any;


  config: AngularEditorConfig = {
    editable: false,
    spellcheck: true,
    enableToolbar: false,
    showToolbar:false,
    height: '15rem',
    minHeight: '5rem',
    placeholder: 'Enter text here...',
    translate: 'no',
    defaultParagraphSeparator: 'p',
    defaultFontName: 'Arial',
    outline:false,
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
    ]
  };






  ngOnInit(): void {
    var Blogs = localStorage.getItem('blog');
    this.blogs = JSON.parse(Blogs);
    this.img = (this.sanitizer.bypassSecurityTrustUrl(this.blogs.blogHeaderImage[0]));

    for (let key in this.blogs.blogHeaderImage) {
      this.blogs.blogHeaderImage[key] = this.sanitizer.bypassSecurityTrustUrl(key);
      this.imgsrcs.push(this.sanitizer.bypassSecurityTrustUrl(key));

    }
    this.img = this.imgsrcs[this.imgsrcs.length - 1];
    console.log(this.img);
    this.htmlContent=this.blogs.text;

  }



}
