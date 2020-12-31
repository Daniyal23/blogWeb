import { Component, OnInit } from '@angular/core';
import { Blog } from 'src/app/models/blog';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { BlogService } from 'src/app/services/blog.service';


@Component({
  selector: 'app-blog-list',
  templateUrl: './blog-list.component.html',
  styleUrls: ['./blog-list.component.css']
})
export class BlogListComponent implements OnInit {
  public blogs: Blog[] = [];
  public loggedin = 0;
  constructor(
    private blogService: BlogService,
    private AuthService: AuthenticationService
  ) { }

  ngOnInit(): void {
    console.log("in bloglist");
    this.blogService.getAllBlogs().subscribe(data => {
      this.blogs = data;
      // console.log(data);
    });
    if (this.AuthService.parseJwt(localStorage.getItem("currentUser"))) {
      this.loggedin = 1;
    }

  }

  logout() {
    this.AuthService.logout();
  }
}
