import { Component, OnInit, NgZone, ChangeDetectorRef } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { User } from 'src/app/models/users';
import { CommentComponent } from 'src/app/components/shared/comment/comment.component'
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email: string;
  password: string;
  returnUrl: string;

  constructor(
    private userService: UserService,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute,
    private ngZone: NgZone,
    private router: Router,
    private cdr: ChangeDetectorRef,
    private authService: AuthenticationService
  ) { }

  public user: User[] = [];
  public tuser: User;
  public errorss: Array<any>;
  public check: number = 0;
  public checkingerror: number = 0;
  public tok: any;
  public users: User;
  public gett: any = "";
  public gettcheck = 0;

  ngOnInit(): void {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || 'blog';

    this.userService.getAllUsers().subscribe(data => {
      this.gett = data;
    })
  }


  ngAfterViewChecked() {
    if (this.gett.length <= 0 && this.gettcheck == 0) {
      //this.authService.admin();
      this.gettcheck = 1;
    }
    if (this.tok) {
      //console.log(this.tok, "tok")
      if (this.tok.error === "Password incorrect" && this.checkingerror == 0) {
        // console.log("laa");
        this.errorss = [];
        //this.check = 0;
        this.checkingerror = 1;
        //this.snackBar.open("Invalid Username or password");
        this.snackBar.open("Invalid Username or password", null, {
          duration: 2000,
          panelClass: ['error-snackbar'],
          horizontalPosition: 'right',
          verticalPosition: 'top'
        });

      }
      else if (this.tok.error === "account not approved" && this.checkingerror == 0) {
        //console.log("error", this.tok.error)
        // console.log("laa");
        this.errorss = [];
        //this.check = 0;
        this.checkingerror = 1;
        //this.snackBar.open("Invalid Username or password");
        this.snackBar.open("Account Not Approved", null, {
          duration: 2000,
          panelClass: ['error-snackbar'],
          horizontalPosition: 'right',
          verticalPosition: 'top'
        });

      }
      else if (this.tok.error === "Account not found" && this.checkingerror == 0) {
        //console.log("error", this.tok.error)
        // console.log("laa");
        this.errorss = [];
        //this.check = 0;
        this.checkingerror = 1;
        //this.snackBar.open("Invalid Username or password");
        this.snackBar.open("Account Does Not Exist", null, {
          duration: 2000,
          panelClass: ['error-snackbar'],
          horizontalPosition: 'right',
          verticalPosition: 'top'
        });

      }



      else if (this.tok && this.check === 0 && this.tok.error != "Password incorrect") {
        this.errorss = null;
        //  console.log(this.tok, "wewfw");
        this.check = 1;
        //localStorage.setItem('currentUser', JSON.stringify(this.tok));
        this.authService.setLocalStorage(this.tok);
        this.authService.CurrentUserValueSet(this.tok);
        //this.router.navigateByUrl(this.returnUrl);

        // this.NgZone.run(() => this.router.navigateByUrl(this.returnUrl))
        this.ngZone.run(() => {
          this.router.navigateByUrl(this.returnUrl);
        });
        this.snackBar.open("Logged in", null, {
          duration: 2000,
          panelClass: ['error-snackbar'],
          horizontalPosition: 'right',
          verticalPosition: 'top'
        });
      }



    }
    this.cdr.detectChanges();
  }

  login() {

    //console.log("in login", this.password, this.email);
    if (this.email == null || this.password == null) {
      return;
    }
    //console.log("in login1", this.password, this.email);
    this.errorss = null;

    this.checkingerror = 0;
    this.tok = null;
    this.users = new User;
    this.users.Password = this.password;
    this.users.Email = this.email;
    //console.log(this.user, "in login component");


    this.authService.mylogin(this.users).subscribe((data: any) =>
      this.tok = data
      //console.log(data)
    );

  }

}
