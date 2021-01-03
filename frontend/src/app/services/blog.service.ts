import { Injectable } from '@angular/core';
import { Blog } from '../models/blog';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  uri = 'http://localhost:3000/blogs';

  constructor(
    private http: HttpClient,
    //private router: Router
  ) { }

  public getheader() {
    var a = localStorage.getItem("id_token");
    //console.log(a);

    return a;
  }

  public addBlog(blog: Blog): void {

    this.http.post(`${this.uri}/add`, blog, { headers: { 'Authorization': this.getheader() } })
      .subscribe(res => console.log('Done'));

  }
  public getAllBlogs() {

    return this.http.get<Blog[]>(`${this.uri}/getAllBlogs`)


  }


  public getBlog(id: number) {
    //console.log(id, "from service");
    return this.http.get(`${this.uri}/getBlogsById/${id}`)
      .pipe(
        map((res: Response) => {
          return res || {}
        }),


      )

  }

  public updateBlog(id, obj: Blog) {
    this
      .http
      .post(`${this.uri}/update/${id}`, obj, { headers: { 'Authorization': this.getheader() } })
      .subscribe(res => console.log('Done'));
  }

}
