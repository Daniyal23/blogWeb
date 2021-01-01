import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private AuthService: AuthenticationService) { }
  public loggedin:number=0;
  ngOnInit(): void {
    if (this.AuthService.parseJwt(localStorage.getItem("currentUser"))) {
      this.loggedin = 1;
    }
    else {

    }

  }

  logout() {
    this.AuthService.logout();
  }
  }


