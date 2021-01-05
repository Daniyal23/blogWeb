import { Injectable } from '@angular/core';
import { User } from '../models/users'
import { HttpClient } from '@angular/common/http';

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
    return this.http.delete(`${this.uri}/delete/${id}`, { headers: { 'Authorization': this.getheader() } });
  }
  public updateUser(id, obj: User) {
    this
      .http
      .post(`${this.uri}/updateUser/${id}`, obj, { headers: { 'Authorization': this.getheader() } })
      .subscribe(res => console.log(res));
  }




}
