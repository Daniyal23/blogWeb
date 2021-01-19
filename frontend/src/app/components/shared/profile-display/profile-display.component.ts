import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile-display',
  templateUrl: './profile-display.component.html',
  styleUrls: ['./profile-display.component.css']
})
export class ProfileDisplayComponent implements OnInit {
  userdetails: any;
  account: any;
  public loading = false;
  constructor(
    private AuthService: AuthenticationService,
    private userService: UserService,
  ) { 
    
    

  }

  ngOnInit(): void {
    this.loading = true;
    if (this.AuthService.isLoggedIn()) {
      this.userdetails = this.AuthService.getuserdetails();
      // console.log("üser details", this.userdetails);
      this.userService.getUsersById(this.userdetails.id).subscribe(data => {
        this.account = data["data"];
        console.log(data);
        this.loading=false;
      })
     
   }
  }

}
