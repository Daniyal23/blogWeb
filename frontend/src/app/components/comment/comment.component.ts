import { Component, Input, OnInit } from '@angular/core';
import { Comment } from 'src/app/models/comments';
@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {
  @Input() comment: Comment;
  constructor() { }
  public date: string = "";
  ngOnInit(): void {
    this.dateset();
  }
  dateset() {
    console.log(this.comment.datePublished.toString());
    this.date = this.comment.datePublished.toString();
    this.date = (this.date.split("T")[0]);
    var a = this.date.split("-");
    this.date = "";
    this.date = a[2] + "-" + a[1] + "-" + a[0];
    console.log(this.date, "date");


  }

}
