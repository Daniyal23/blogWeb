import { Injectable } from '@angular/core';
import { Blog } from '../models/blog';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { catchError, map } from 'rxjs/operators';
import{uriGlobal} from '../services/global';
@Injectable({
  providedIn: 'root'
})
export class BlogService {

  uri = uriGlobal+'Blogs';

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

    this.http.post(`${this.uri}/addBlog`, blog, { headers: { 'Authorization': this.getheader() } })
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
    return this
      .http
      .post(`${this.uri}/updateBlog/${id}`, obj, { headers: { 'Authorization': this.getheader() } })

  }
  public deleteBlog(id) {
    return this
      .http
      .delete(`${this.uri}/deleteBlog/${id}`, { headers: { 'Authorization': this.getheader() } });
  }

}
