import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/users';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-admin-userapprove',
  templateUrl: './admin-userapprove.component.html',
  styleUrls: ['./admin-userapprove.component.css']
})
export class AdminUserapproveComponent implements OnInit {
  public users: any[] = [];
  public user: any[] = [];
  public check: number = 0;
  public loading=false;
  constructor(
    public userService: UserService, private authService: AuthenticationService, private cdr: ChangeDetectorRef,
  ) { }

  ngOnInit(): void {
    this.loading=true;
    this.authService.checkaccessregular();
    this.authService.checkaccessmoderator();
    this.authService.checkaccessblogger();
    this.getusers();
    
  }
  ngAfterViewChecked() {
    if (this.user.length > 0) {
      this.users = this.user.filter(a => a.status == "notapproved" || a.status == "blocked")
      this.check = 1;
      this.loading=false;
      //console.log(this.user, " users");
    }
    
    this.cdr.detectChanges();

  }
  getusers() {
    this.userService.getAllUsers().subscribe(data => {
      this.user = data["data"];

    })
    //  console.log("hello");
    this.user.forEach(value => {
      //   console.log(value, 'daasd')
    })
  }
  approve(inp) {
    //console.log(inp);
    this.user[this.user.findIndex(a => a._id == inp)].status = "approved";
    this.userService.updateUser(this.user[this.user.findIndex(a => a._id == inp)]._id, this.user[this.user.findIndex(a => a._id == inp)]).subscribe(data => {
      console.log(data);
    });
  }
  delete(inp) {
    this.user[this.user.findIndex(a => a._id == inp)].status = "blacklist";
    this.userService.updateUser(this.user[this.user.findIndex(a => a._id == inp)]._id, this.user[this.user.findIndex(a => a._id == inp)]).subscribe(data => {
      console.log(data);
    });;

  }
}
