import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { BlogService } from 'src/app/services/blog.service';

import { Blog } from 'src/app/models/blog';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-blog-add',
  templateUrl: './blog-add.component.html',
  styleUrls: ['./blog-add.component.css']
})
export class BlogAddComponent implements OnInit {

  constructor(
    private sanitizer: DomSanitizer,
    private AuthService: AuthenticationService,
    private blogService: BlogService,
    private snackBar: MatSnackBar,
    private router: Router,
  ) { }
  
  
  public editorContent: string = '<p><img src="http://localhost:3000/assets/3a57c7ac2d66c194aed7fcafac54c25229ea70e3.PNG" style="width: 176px;" class="fr-fic fr-dii"></p><p>fjwejfjqefjqjdfqw</p><p><br></p> ';
  public displayman: any;
  public options: Object = {
    charCounterCount: true,
    imageManagerDeleteMethod: "POST",
    imageManagerDeleteURL: 'http://localhost:3000/delete_image',
    // Set the image upload parameter.
    imageUpload: true,
    // Set the image upload URL.
    imageUploadURL: 'http://localhost:3000/image_upload',
    imageDefaultDisplay: 'inline-block',
    // Additional upload params.
    imageUploadParams: { id: 'my_editor' },

    // Set request type.
    imageUploadMethod: 'POST',
    imageManagerLoadMethod: "GET",

    // Set max image size to 5MB.
    imageMaxSize: 5 * 1024 * 1024,

    // Allow to upload PNG and JPG.
    imageAllowedTypes: ['jpeg', 'jpg', 'png'],
    events: {
      'froalaEditor.initialized': function () {
        console.log('initialized');
      },
      'froalaEditor.image.beforeUpload': function (e, editor, images) {
        //Your code 
        console.log("in upload")
        if (images.length) {
          console.log("in if ", images);
          // Create a File Reader.
          const reader = new FileReader();
          // Set the reader to insert images when they are loaded.
          reader.onload = (ev) => {
            const result = ev.target['result'];
            editor.image.insert(result, null, null, editor.image.get());
            console.log(ev, editor.image, ev.target['result'])
          };
          // Read image as base64.
          reader.readAsDataURL(images[0]);
        }
        // Stop default upload chain.
        return false;
      }

    }
  }
  


  name = 'Angular 6';
  htmlContent = '';
  blogobj: Blog = new Blog();
  userdetials: any;

  public base64textString = '';
  public imgsrcs: Array<any> = ["/assets/noimage.png"];
  public imgcheck: number = 0;

  public title: string = "";


  config: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: 'auto',
    minHeight: '15rem',
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
    ],
    //uploadUrl: 'v1/image',
    // upload: (file: File) => {this.handleFileSelect(file)},
    //uploadWithCredentials: false,
    sanitize: true,

  };

  ngOnInit(): void {

    this.AuthService.checkaccessregular();
    this.userdetials = this.AuthService.parseJwt(localStorage.getItem("currentUser"));
    // console.log(this.userdetials);
    // console.log(this.userdetials.username);

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

    // console.log(this.imgsrcs, "img");
    // console.log(this.blogobj.blogHeaderImage, "header");
    this.imgcheck = 1;
  }

  removeImage() {
    //  console.log("remove func");
    this.imgsrcs[0] = "/assets/noimage.png";
    this.imgcheck = 0;


  }

  Publish() {
    if (this.imgsrcs[0] == "/assets/noimage.png") {
      this.snackBar.open("Header Image is required", null, {
        duration: 2000,
        panelClass: ['danger-snackbar'],
        horizontalPosition: 'right',
        verticalPosition: 'top'
      });
      return;
    }
    if (this.htmlContent == '') {
      this.snackBar.open("Content is required", null, {
        duration: 2000,
        panelClass: ['danger-snackbar'],
        horizontalPosition: 'right',
        verticalPosition: 'top'
      });
      return;
    }
    if (this.title == '') {
      this.snackBar.open("Title is required", null, {
        duration: 2000,
        panelClass: ['danger-snackbar'],
        horizontalPosition: 'right',
        verticalPosition: 'top'
      });
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
      this.blogobj.status = "hidden";
      this.blogobj.text = this.htmlContent;
      this.blogobj.title = this.title;
      this.blogobj.creatorId = this.userdetials.id;
      this.blogobj.creatorName = this.userdetials.username;

      //  console.log(this.blogobj);
      localStorage.setItem('blog', JSON.stringify(this.blogobj));
      this.blogService.addBlog(this.blogobj);

      this.snackBar.open("Blog Successfully Added", null, {
        duration: 2000,
        panelClass: ['success-snackbar'],
        horizontalPosition: 'right',
        verticalPosition: 'top'
      });
      this.router.navigate(['/blog']);
    }
  }
  logout() {
    this.AuthService.logout();
  }
}

