
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { NavigationEnd, Router } from '@angular/router';
import { User } from '../models/users';
import * as moment from "moment";
//import { uriGlobal } from './conf';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;
  public user1: User = new User();

  //uri = uriGlobal + "users";
  uri = 'http://localhost:3000/api/v1/Users';


  constructor(private http: HttpClient, private router: Router) {
    //console.log("in constructor start");
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
    this.admin();


  }
  public admin() {
    //console.log("admin called");
    return this.http.post(`${this.uri}/createAdmin`, this.user1);
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
    var a = this.parseJwt(localStorage.getItem('currentUser'));
    // console.log(a, "expire");
    const expiresAt = moment().add(a.exp);
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
    localStorage.removeItem('expires_at');
    localStorage.removeItem('id_token');

    this.currentUserSubject.next(null);
    this.router.navigate(['blog']);
    // console.log('logged out');
  };

  async clearlocal() {
    // remove user from local storage to log user out
    //await this.afAuth.auth.signOut().then(response => {

    localStorage.removeItem('currentUser');
    localStorage.removeItem('expires_at');
    localStorage.removeItem('id_token');

    this.currentUserSubject.next(null);

  };




  public isLoggedIn() {
    //console.log(moment());
    return moment().isBefore(this.getExpiration());
  }

  isLoggedOut() {
    return !this.isLoggedIn();
  }

  getExpiration() {
    const expiration = localStorage.getItem("expires_at");
    const expiresAt = JSON.parse(expiration);
    //console.log(expiresAt, "at");
    return moment(expiresAt);
  }

  getuserdetails() {
    return this.parseJwt(localStorage.getItem("currentUser"));
  }
  parseJwt(token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
  };

  checkaccessregular() {
    var previousUrl;

    if (this.getuserdetails().accountType == "regular") {

      //console.log("in false");
      this.router.events
        .pipe(filter(event => event instanceof NavigationEnd)
        ).subscribe(e => {
          // console.log('prev:', e['url']);
          previousUrl = e['url'];

        });
      this.router.navigateByUrl(previousUrl);
    }
    else {
      // console.log("aa ja");
    }
  }

  checkaccessblogger() {
    var previousUrl;

    if (this.getuserdetails().accountType == "blogger") {

      //console.log("in false");
      this.router.events
        .pipe(filter(event => event instanceof NavigationEnd)
        ).subscribe(e => {
          //console.log('prev:', e['url']);
          previousUrl = e['url'];

        });
      this.router.navigateByUrl(previousUrl);
    }
    else {
      // console.log("aa ja");
    }
  }

  checkaccessmoderator() {
    var previousUrl;

    if (this.getuserdetails().accountType == "moderator") {

      //console.log("in false");
      this.router.events
        .pipe(filter(event => event instanceof NavigationEnd)
        ).subscribe(e => {
          //console.log('prev:', e['url']);
          previousUrl = e['url'];

        });
      this.router.navigateByUrl(previousUrl);
    }
    else {
      //console.log("aa ja");
    }
  }

}

