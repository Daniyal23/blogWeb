import { Injectable } from '@angular/core';
import { Blog } from '../models/blog';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  uri = 'http://localhost:3000/users';

  constructor(
    private http: HttpClient,
    //private router: Router
  ) { }

  public getheader() {
    var a = localStorage.getItem("id_token");
    // a.split(',', 2);
    // a = a.substr(24, (a.length));
    // a = a.substr(1, (a.length - 1));
    // a = a.substr(0, (a.length - 2));

    //console.log(a);
    return a;
  }

  public addDealer(blog: Blog): void {

    this.http.post(`${this.uri}/add`, blog, { headers: { 'Authorization': this.getheader() } })
      .subscribe(res => console.log('Done'));

  }
}
