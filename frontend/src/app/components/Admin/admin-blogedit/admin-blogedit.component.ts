import { Component, OnInit, ChangeDetectorRef, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { Blog } from 'src/app/models/blog';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { BlogService } from 'src/app/services/blog.service';





@Component({
  selector: 'app-admin-blogedit',
  templateUrl: './admin-blogedit.component.html',
  styleUrls: ['./admin-blogedit.component.css']
})
export class AdminBlogeditComponent implements OnInit {

  constructor(
    private AuthService: AuthenticationService,
    private blogService: BlogService,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef,
    private sanitizer: DomSanitizer,
    private snackBar: MatSnackBar,
    private router: Router,
    



  ) { }
  public htmlContent = '';
  public test: any;
  userdetials: any;
  public blogs: any;
  public base64textString = '';
  public imgsrcs: Array<any> = ["/assets/noimage.png"];
  public imgcheck: number = 0;
  public img: any;


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
  public check = 0;
  public returnUrl: string;

 
  ngOnInit(): void {
    this.AuthService.checkaccessregular();
    this.getblogbyid();
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || 'blog';

  }
  ngAfterViewChecked() {
    if (this.blogs && this.check == 0) {
      this.htmlContent = this.blogs.text;
      this.check = 1;
      for (let key in this.blogs.blogHeaderImage) {
        //console.log("here");
        this.blogs.blogHeaderImage[key] = this.sanitizer.bypassSecurityTrustUrl(key);
        this.imgsrcs.push(this.sanitizer.bypassSecurityTrustUrl(key));

      }
      this.img = this.imgsrcs[this.imgsrcs.length - 1];
      this.imgsrcs = [];
      this.imgsrcs.push(this.img);
    }
    this.cdr.detectChanges();

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
        this.test = data;
        // console.log(this.test);
      })
    })
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

    this.blogs.blogHeaderImage["data:image/png;charset=utf-8;base64," + this.base64textString] = this.sanitizer.bypassSecurityTrustUrl("data:image/png;charset=utf-8;base64," + this.base64textString);
    if (this.imgsrcs.length > 0) {
      this.imgsrcs.pop();
    }
    this.imgsrcs.push(this.sanitizer.bypassSecurityTrustUrl("data:image/png;charset=utf-8;base64," + this.base64textString));

    // console.log(this.imgsrcs, "img");
    // console.log(this.blogs.blogHeaderImage, "header");
    this.imgcheck = 1;
  }

  removeImage() {
    // console.log("remove func");
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
    else {
      //this.blogobj.blogHeaderImage = this.imgsrcs;
      this.blogs.dateUpdated = new Date();
      this.blogs.status = "edit";
      this.blogs.text = this.htmlContent;
      this.blogs.title = "blog";
      this.blogs.isApproved = false;


      //console.log(this.blogs);
      localStorage.setItem('blog', JSON.stringify(this.blogs));
      this.blogService.updateBlog(this.test._id, this.blogs).subscribe(data => {
        console.log(data);
      });

      this.snackBar.open("Blog Edited Successfully", null, {
        duration: 2000,
        panelClass: ['success-snackbar'],
        horizontalPosition: 'right',
        verticalPosition: 'top'
      });

      setTimeout(() => { this.router.navigate([this.returnUrl]); }, 2000)
    }
  }

}
