import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-richtext-editor',
  templateUrl: './richtext-editor.component.html',
  styleUrls: ['./richtext-editor.component.css']
})
export class RichtextEditorComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  title = 'test-app';
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
  /*handleFileSelect(evt) {
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
  
  */
  /*_handleReaderLoaded(readerEvt) {
  
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
  }*/
  public onClickMe() {
    alert(this.editorContent);
    localStorage.setItem('html', this.editorContent);
    this.displayman = this.editorContent;
  }
  public onClickMe1() {
    alert(this.editorContent);
    var a = localStorage.getItem('html');
    this.editorContent = a;
    this.displayman = this.editorContent;
  }

}
