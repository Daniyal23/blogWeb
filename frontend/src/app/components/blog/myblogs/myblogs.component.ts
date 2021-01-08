import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Blog } from 'src/app/models/blog';
import { BlogService } from 'src/app/services/blog.service';
import { MatSlideToggleModule } from '@angular/material/slide-toggle'
import { AuthenticationService } from 'src/app/services/authentication.service';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-myblogs',
  templateUrl: './myblogs.component.html',
  styleUrls: ['./myblogs.component.css']
})
export class MyblogsComponent implements OnInit {
  public blogs: any[] = [];
  public check = 0;
  returnUrl: string;
  constructor(
    public blogService: BlogService,
    private AuthService: AuthenticationService,
    private route: ActivatedRoute,
    private router: Router,
    private cdr: ChangeDetectorRef,
  ) { }

  ngOnInit(): void {

    this.AuthService.checkaccessregular();

    this.getblogs();
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || 'blog';
    console.log(this.returnUrl, "yo");
  }
  ngAfterViewChecked() {
    if (this.blogs.length > 0 && this.check == 0) {

      this.blogs = this.blogs.filter(a => a.creatorId == this.AuthService.getuserdetails().id);
      this.check = 1;
    }
    this.cdr.detectChanges();
  }
  getblogs() {
    this.blogService.getAllBlogs().subscribe(data => {
      this.blogs = data;
    })
    this.blogs.forEach(value => {
      //console.log(value, "getblogs")
    }
    )

  }
  approve(inp) {
    this.blogs[this.blogs.findIndex(a => a._id == inp)].isApproved = true;
    this.blogService.updateBlog(inp, this.blogs.find(a => a._id == inp))
  }
  delete(inp) {
    this.blogs.splice(this.blogs.findIndex(a => a._id == inp), 1);
    this.blogService.deleteBlog(inp).subscribe(data => {
      console.log(data);
    });
  }
  statuss(inp) {
    if (this.blogs[this.blogs.findIndex(a => a._id == inp)].status != "show") {
      this.blogs[this.blogs.findIndex(a => a._id == inp)].status = "show";
      this.blogService.updateBlog(inp, this.blogs.find(a => a._id == inp));

    }
    else {
      this.blogs[this.blogs.findIndex(a => a._id == inp)].status = "hidden";
      this.blogService.updateBlog(inp, this.blogs.find(a => a._id == inp));
    }
  }
  logout() {
    this.AuthService.logout();
  }
}
