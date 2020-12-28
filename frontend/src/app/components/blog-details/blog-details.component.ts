import { Component, OnInit } from '@angular/core';
import {Comments} from 'src/app/models/comments'
@Component({
  selector: 'app-blog-details',
  templateUrl: './blog-details.component.html',
  styleUrls: ['./blog-details.component.css']
})
export class BlogDetailsComponent implements OnInit {
   comments=Comments;// Passing the data here (Comments is an arrayy of comments) pass data in this var to display
  constructor() { }

  ngOnInit(): void {
  }

}
