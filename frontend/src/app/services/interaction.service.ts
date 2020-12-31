import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { catchError, map } from 'rxjs/operators';
import { Interaction } from '../models/interaction';

@Injectable({
  providedIn: 'root'
})
export class InteractionService {


  uri = 'http://localhost:3000/interactions';

  constructor(
    private http: HttpClient,
    //private router: Router
  ) { }

  public getheader() {
    var a = localStorage.getItem("id_token");
    console.log(a);

    return a;
  }

  public addInteraction(interact: Interaction): void {

    this.http.post(`${this.uri}/add`, interact, { headers: { 'Authorization': this.getheader() } })
      .subscribe(res => console.log(res));

  }

  public getInteractionbyid(id: number) {
    //console.log(id, "from service");
    return this.http.get(`${this.uri}/getInteractions/${id}`, { headers: { 'Authorization': this.getheader() } })
      .pipe(
        map((res: Response) => {
          return res || {}
        }),


      )

  }

  public updateBlog(id, obj: Interaction) {
    this
      .http
      .post(`${this.uri}/update/${id}`, obj, { headers: { 'Authorization': this.getheader() } })
      .subscribe(res => console.log('Done'));
  }
  /*
  public getAllBlogs() {

    return this.http.get<Blog[]>(`${this.uri}/getAllBlogs`, { headers: { 'Authorization': this.getheader() } })


  }


  public getInteractionbyid(id: number) {
    //console.log(id, "from service");
    return this.http.get(`${this.uri}/getBlogs/${id}`, { headers: { 'Authorization': this.getheader() } })
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
*/
}
