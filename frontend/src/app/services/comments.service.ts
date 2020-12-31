import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { catchError, map } from 'rxjs/operators';
import { Comment } from '../models/comments';

@Injectable({
  providedIn: 'root'
})
export class CommentsService {



  uri = 'http://localhost:3000/comments';

  constructor(
    private http: HttpClient,
    //private router: Router
  ) { }

  public getheader() {
    var a = localStorage.getItem("id_token");
    console.log(a);

    return a;
  }

  public addComments(comment: Comment) {

    var a;
    return this.http.post(`${this.uri}/add`, comment, { headers: { 'Authorization': this.getheader() } })

  }

  public getCommentbyid(id: string) {
    //console.log(id, "from service");
    return this.http.get(`${this.uri}/getComments/${id}`, { headers: { 'Authorization': this.getheader() } })
      .pipe(
        map((res: Response) => {
          return res || {}
        }),


      )

  }

  public updateComment(id, obj: Comment) {
    this
      .http
      .post(`${this.uri}/update/${id}`, obj, { headers: { 'Authorization': this.getheader() } })
      .subscribe(res => console.log('Done'));
  }
  /*
  public getAllBlogs() {

    return this.http.get<Blog[]>(`${this.uri}/getAllBlogs`, { headers: { 'Authorization': this.getheader() } })


  }


*/
}
