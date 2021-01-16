import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  loggedin = 0;
  runonce = 0;
  userdetails: any;
  accounttype: any = "";
  check = 0;
  constructor(
    private AuthService: AuthenticationService,
    private userService: UserService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {

  }
  ngAfterViewChecked() {
    if (this.runonce == 0) {
      if (this.AuthService.isLoggedIn()) {
        this.loggedin = 1;
        this.runonce = 1;

        this.userdetails = this.AuthService.getuserdetails();
        // console.log("üser details", this.userdetails);
        this.userService.getUserAccountType(this.userdetails.id).subscribe(data => {
          this.accounttype = data["data"];
          console.log(data);
        })

      }
      else {
        this.AuthService.clearlocal();
      }
    }
    if (this.accounttype != "" && this.check == 0) {
      //console.log(this.accounttype, "dsfasd");
      this.check = 1;
    }
    this.cdr.detectChanges();
  }
  logout() {
    this.AuthService.logout();
    //window.location.reload();
    this.loggedin = 0;
  }

}
