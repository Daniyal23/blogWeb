import { Component, OnInit } from '@angular/core';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Blog } from 'src/app/models/blog';
import { AuthenticationService } from 'src/app/services/authentication.service'

@Component({
  selector: 'app-blog-add',
  templateUrl: './blog-add.component.html',
  styleUrls: ['./blog-add.component.css']
})
export class BlogAddComponent implements OnInit {

  constructor(
    private sanitizer: DomSanitizer,
    private AuthService: AuthenticationService,
  ) { }
  name = 'Angular 6';
  htmlContent = '';
  blogobj: Blog = new Blog();
  userdetials: any;

  public base64textString = '';
  public imgsrcs: Array<any> = ["/assets/noimage.png"];
  public imgcheck: number = 0;


  config: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: '15rem',
    minHeight: '5rem',
    placeholder: 'Enter text here...',
    translate: 'no',
    defaultParagraphSeparator: 'p',
    defaultFontName: 'Arial',
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

    this.userdetials = this.AuthService.parseJwt(localStorage.getItem("currentUser"));
    console.log(this.userdetials);
    console.log(this.userdetials.username);
  }


  handleFileSelect(evt) {
    const files = evt.target.files;
    // var file = files[0];
    if (files) {

      Array.from(files).forEach(file => {
        const f = file as File;
        const reader = new FileReader();
        reader.onload = this._handleReaderLoaded.bind(this);
        reader.readAsBinaryString(f);
      });

    }
  }


  _handleReaderLoaded(readerEvt) {

    const binaryString = readerEvt.target.result;
    this.base64textString = btoa(binaryString);

    this.blogobj.blogHeaderImage["data:image/png;charset=utf-8;base64," + this.base64textString] = this.sanitizer.bypassSecurityTrustUrl("data:image/png;charset=utf-8;base64," + this.base64textString);
    if (this.imgsrcs.length > 0) {
      this.imgsrcs.pop();
    }
    this.imgsrcs.push(this.sanitizer.bypassSecurityTrustUrl("data:image/png;charset=utf-8;base64," + this.base64textString));

    console.log(this.imgsrcs, "img");
    console.log(this.blogobj.blogHeaderImage, "header");
    this.imgcheck = 1;
  }

  removeImage() {
    console.log("remove func");
    this.imgsrcs[0] = "/assets/noimage.png";
    this.imgcheck = 0;


  }

  Publish() {
    if (this.htmlContent == '') {
      return;
    }
    else {
      //this.blogobj.blogHeaderImage = this.imgsrcs;
      this.blogobj.datePublished = null;
      this.blogobj.dateSubmitted = new Date();
      this.blogobj.dateUpdated = this.blogobj.dateSubmitted;
      this.blogobj.isApproved = false;
      this.blogobj.numDislikes = 0;
      this.blogobj.numLikes = 0;
      this.blogobj.numOfReads = 0;
      this.blogobj.reportsCounter = 0;
      this.blogobj.status = "idk";
      this.blogobj.text = this.htmlContent;
      this.blogobj.title = "blog";
      this.blogobj.creatorId = this.userdetials.id;
      this.blogobj.creatorName = this.userdetials.username;

      console.log(this.blogobj);
      localStorage.setItem('blog', JSON.stringify(this.blogobj));
    }
  }

}

