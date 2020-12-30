import { Injectable } from '@angular/core';
import { Blog } from '../models/blog';
import { HttpClient } from '@angular/common/http';

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
    console.log(a);

    return a;
  }

  public addBlog(blog: Blog): void {

    this.http.post(`${this.uri}/add`, blog, { headers: { 'Authorization': this.getheader() } })
      .subscribe(res => console.log('Done'));

  }
  public getAllBlogs() {

    return this.http.get<Blog[]>(`${this.uri}/getAllBlogs`, { headers: { 'Authorization': this.getheader() } })


  }

  async getBlog(id: number, prop: Blog) {

    await axios.get(`${this.uri}/getBlog/${id}`, { headers: { 'Authorization': this.getheader() } }).
      then((res) => prop = res.data)
    return prop


  }

  // }
}
