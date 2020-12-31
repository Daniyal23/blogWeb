import { Component, Input, OnInit } from '@angular/core';
import { Blog } from 'src/app/models/blog';
import { DomSanitizer } from '@angular/platform-browser';
import { htmlToText } from 'html-to-text';
@Component({
  selector: 'app-blog-card',
  templateUrl: './blog-card.component.html',
  styleUrls: ['./blog-card.component.css']
})
export class BlogCardComponent implements OnInit {
  @Input() blog: Blog;
  public img: any;
  public texttoshow: string;
  public date: string;

  constructor(private sanitizer: DomSanitizer,) { }
  public imgsrcs: Array<any> = [];
  ngOnInit(): void {
    //this.img = (this.sanitizer.bypassSecurityTrustUrl(this.blog.blogHeaderImage[0]));
    for (let key in this.blog.blogHeaderImage) {
      this.blog.blogHeaderImage[key] = this.sanitizer.bypassSecurityTrustUrl(key);
      this.imgsrcs.push(this.sanitizer.bypassSecurityTrustUrl(key));

    }
    this.img = this.imgsrcs[this.imgsrcs.length - 1];
    //console.log(this.img);
    this.texttoshow = this.blog.text.slice(0, 50);
    //this.htmlContent = this.blog.text;
    //console.log(this.blog.dateSubmitted);
    this.date = this.blog.dateSubmitted.toString();
    this.date = (this.date.split("T")[0]);

    this.texttoshow = this.htmlconverter(this.texttoshow);
  }


  htmlconverter(html) {
    const text = htmlToText(html, {
      wordwrap: 130
    });
    return text;
  }
}
