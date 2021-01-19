import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { catchError, map } from 'rxjs/operators';
import { Comment } from '../models/comments';
import{uriGlobal} from '../services/global';

@Injectable({
  providedIn: 'root'
})
export class CommentsService {



  uri = uriGlobal+'Comments';

  constructor(
    private http: HttpClient,
    //private router: Router
  ) { }

  public getheader() {
    var a = localStorage.getItem("id_token");
    //console.log(a);

    return a;
  }

  public addComments(comment: Comment) {

    var a;
    return this.http.post(`${this.uri}/addComments`, comment, { headers: { 'Authorization': this.getheader() } })

  }

  public getCommentbyid(id: string) {
    //console.log(id, "from service");
    return this.http.get(`${this.uri}/getCommentsById/${id}`)
      //, { headers: { 'Authorization': this.getheader() } })
      .pipe(
        map((res: Response) => {
          return res || {}
        }),


      )

  }

  public updateComment(id, obj: Comment) {
    return this
      .http
      .post(`${this.uri}/updateComment/${id}`, obj, { headers: { 'Authorization': this.getheader() } })

  }

  public getAllComments() {

    return this.http.get<Comment[]>(`${this.uri}/getAllComments`, { headers: { 'Authorization': this.getheader() } })


  }




  public deleteComment(id) {
    return this
      .http
      .delete(`${this.uri}/deleteComment/${id}`, { headers: { 'Authorization': this.getheader() } });
  }
}

