import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/users';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-admin-userapprove',
  templateUrl: './admin-userapprove.component.html',
  styleUrls: ['./admin-userapprove.component.css']
})
export class AdminUserapproveComponent implements OnInit {
  public users: any[] = [];
  public user: any[] = [];
  public check:number=0;
  constructor(
    public userService: UserService,
  ) { }

  ngOnInit(): void {
    this.getusers();
  }
  ngAfterViewChecked() {
    if (this.user.length > 0) {
      this.users=this.user.filter(a=> a.status=="notapproved")
      this.check = 1;
    
      //console.log(this.user, " users");
    }

  }
  getusers() {
    this.userService.getAllUsers().subscribe(data => {
      this.user = data;

    })
    //  console.log("hello");
    this.user.forEach(value => {
      //   console.log(value, 'daasd')
    })
  }
  approve(inp){
    console.log(inp);
   this.user[ this.user.findIndex(a=> a._id==inp)].status="approved";
   this.userService.updateUser(this.user[ this.user.findIndex(a=> a._id==inp)]._id,this.user[ this.user.findIndex(a=> a._id==inp)]);
  }
  delete(inp){
    this.user[ this.user.findIndex(a=> a._id==inp)].status="blacklist";
    this.userService.updateUser(this.user[ this.user.findIndex(a=> a._id==inp)]._id,this.user[ this.user.findIndex(a=> a._id==inp)]);
   
  }
}
