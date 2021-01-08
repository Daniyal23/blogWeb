import { Injectable } from '@angular/core';
import { User } from '../models/users'
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  uri = 'http://localhost:3000/users';

  constructor(private http: HttpClient) { }


  public getheader() {
    var a = localStorage.getItem("id_token");
    //console.log(a);

    return a;
  }

  getAllUsers() {
    return this.http.get<User[]>(`${this.uri}/getAllUsers`, { headers: { 'Authorization': this.getheader() } });
  }


  deleteUsers(id: number) {
    return this.http.delete(`${this.uri}/deleteUsers/${id}`, { headers: { 'Authorization': this.getheader() } });
  }
  public updateUser(id, obj: User) {
    return this
      .http
      .post(`${this.uri}/updateUser/${id}`, obj, { headers: { 'Authorization': this.getheader() } })
      ;
  }

  getUserAccountType(id: number) {
    return this.http.get(`${this.uri}/getUserAccountType/${id}`, { headers: { 'Authorization': this.getheader() } })
      .pipe(
        map((res: Response) => {
          return res || {}
        }),


      )

  }


  public getUsersById(id: string) {
    //console.log(id, "from service");
    return this.http.get(`${this.uri}/getUsersById/${id}`, { headers: { 'Authorization': this.getheader() } })
      .pipe(
        map((res: Response) => {
          return res || {}
        }),


      )

  }




}
