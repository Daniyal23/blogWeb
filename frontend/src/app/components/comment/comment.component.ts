import { Component, Input, OnInit } from '@angular/core';
import { Comment } from 'src/app/models/comments';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { CommentsService } from 'src/app/services/comments.service';
@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {
  @Input() comment: any;
  constructor(private AuthService: AuthenticationService
    , private commentService: CommentsService) { }
  public date: string = "";
  public htmlcontent = "";
  public edit = 0;
  public showedit = 0;
  public userdetials: any;

  ngOnInit(): void {

    this.dateset();
    this.userdetials = this.AuthService.parseJwt(localStorage.getItem("currentUser"));

    if (this.comment.commentorId == this.userdetials.id) {
      this.edit = 0;
      this.showedit = 1;
      this.htmlcontent = this.comment.content;
    }
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

  onedit() {
    console.log("in edit", this.htmlcontent)
    if (this.edit == 0) {
      this.edit = 1
    }
    else {
      this.comment.content = this.htmlcontent;
      console.log(this.comment._id, "w");
      this.commentService.updateComment(this.comment._id, this.comment);
      this.edit = 0;
    }
  }

}
