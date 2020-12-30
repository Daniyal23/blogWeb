
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { User } from '../models/users';
import * as moment from "moment";
//import { uriGlobal } from './conf';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;


  //uri = uriGlobal + "users";
  uri = 'http://localhost:3000/users';


  constructor(private http: HttpClient, private router: Router) {
    //console.log("in constructor start");
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();



  }

  public get currentUserValue(): User {
    //console.log("current user value", this.currentUserSubject.value);
    this.currentUserSubject.value;
    return this.currentUserSubject.value;
  }

  public CurrentUserValueSet(inp: any) {
    //console.log("current user value", this.currentUserSubject.value);
    this.currentUserSubject.next(inp);
    //return this.currentUserSubject.value;
  }

  setLocalStorage(responseObj) {
    localStorage.setItem('currentUser', JSON.stringify(responseObj));

    const expiresAt = moment().add(responseObj.expiresIn);
    localStorage.setItem('id_token', responseObj.token);
    localStorage.setItem("expires_at", JSON.stringify(expiresAt.valueOf()));
  }

  mylogin(user: User) {
    //console.log("in login func", user);

    return this.http.post(`${this.uri}/login`, user)


  }



  signup(user: User) {
    return this.http.post(`${this.uri}/signup`, user)
  }

  signup2(user: User) {
    return this.http.post(`${this.uri}/emailupdate`, user)
  }



  async logout() {
    // remove user from local storage to log user out
    //await this.afAuth.auth.signOut().then(response => {

    localStorage.removeItem('currentUser');
    localStorage.removeItem('user');

    this.currentUserSubject.next(null);
    this.router.navigate(['login']);
    console.log('logged out');
  };


  public isLoggedIn() {
    return moment().isBefore(this.getExpiration());
  }

  isLoggedOut() {
    return !this.isLoggedIn();
  }

  getExpiration() {
    const expiration = localStorage.getItem("expires_at");
    const expiresAt = JSON.parse(expiration);
    return moment(expiresAt);
  }

  parseJwt(token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
  };
}

