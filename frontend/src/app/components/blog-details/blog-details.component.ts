import { Component, OnInit } from '@angular/core';
import { Blog } from 'src/app/models/blog';
import {Comments} from 'src/app/models/comments'
@Component({
  selector: 'app-blog-details',
  templateUrl: './blog-details.component.html',
  styleUrls: ['./blog-details.component.css']
})
export class BlogDetailsComponent implements OnInit {
   comments=Comments;// Passing the data here (Comments is an arrayy of comments) pass data in this var to display
  constructor() { }
   public blogs:Blog=new Blog();
  ngOnInit(): void {
    var Blogs=localStorage.getItem('blog');
    this.blogs = JSON.parse(Blogs);
  }
  

}
