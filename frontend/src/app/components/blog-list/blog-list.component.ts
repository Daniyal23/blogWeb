import { Component, OnInit } from '@angular/core';
import { Blog } from 'src/app/models/blog';
import { BlogService } from 'src/app/services/blog.service';

@Component({
  selector: 'app-blog-list',
  templateUrl: './blog-list.component.html',
  styleUrls: ['./blog-list.component.css']
})
export class BlogListComponent implements OnInit {
  public blogs: Blog[] = [];
  constructor(
    private blogService: BlogService
  ) { }

  ngOnInit(): void {
    console.log("in bloglist");
    this.blogService.getAllBlogs().subscribe(data => {
      this.blogs = data;
      console.log(data);
    });

  }


}
