import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/users';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-admin-viewusers',
  templateUrl: './admin-viewusers.component.html',
  styleUrls: ['./admin-viewusers.component.css']
})
export class AdminViewusersComponent implements OnInit {


  public users: User[] = [];
  constructor(
    public userService: UserService
  ) { }

  ngOnInit(): void {
    this.getusers();
  }
  ngAfterViewChecked() {
    if (this.users.length > 0) {
      console.log(this.users);
    }
  }

  getusers() {
    this.userService.getAllUsers().subscribe(data => {
      this.users = data;
    })
    console.log("hello");
    this.users.forEach(value => {
      console.log(value, 'daasd')
    })
  }
}
