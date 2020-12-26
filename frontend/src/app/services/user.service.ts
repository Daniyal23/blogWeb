import { Injectable } from '@angular/core';
import { User } from '../models/users'
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  uri = 'http://localhost:3000/users';

  constructor(private http: HttpClient) { }

  // getAll() {
  //   return this.http.get<User[]>(`${config.apiUrl}/users`);
  // }

  register(user: User) {
    return this.http.post(`${this.uri}/signup`, user)

  }

  // delete(id: number) {
  //   return this.http.delete(`${config.apiUrl}/users/${id}`);
  // }
}
