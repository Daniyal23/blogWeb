import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
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
  public check: number = 0;
  constructor(
    private blogService: BlogService,
    private AuthService: AuthenticationService,
    private cdr: ChangeDetectorRef
  ) { }

  checker = 0;
  ngOnInit(): void {
    //console.log("in bloglist");
    this.blogService.getAllBlogs().subscribe((data1) => {

      this.blogs = data1["data"];
    });


    if (this.blogs.length > 0) {
      //console.log(this.blogs)
      this.check = 1;
    }
    if (this.AuthService.parseJwt(localStorage.getItem("currentUser"))) {
      this.loggedin = 1;
    }
    else {

    }

  }
  ngAfterViewChecked() {
    if (this.blogs.length > 0 && this.checker == 0) {
      this.blogs = this.blogs.filter(a => a.status == "show");
      this.checker = 1;
    }
    this.cdr.detectChanges();
  }

  logout() {
    this.AuthService.logout();
  }
}
