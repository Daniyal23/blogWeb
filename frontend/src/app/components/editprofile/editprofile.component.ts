import { group } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, RouterLink } from '@angular/router';


import { AuthenticationService } from 'src/app/services/authentication.service';
import { UserService } from 'src/app/services/user.service';
import { MyErrorStateMatcher } from '../register/register.component';

@Component({
  selector: 'app-editprofile',
  templateUrl: './editprofile.component.html',
  styleUrls: ['./editprofile.component.css']
})
export class EditprofileComponent implements OnInit {

  registerForm!: FormGroup;
  matcher = new MyErrorStateMatcher();
  selectedImage = "";
  selected = 0;
  errorImages = false;
  submitted = false;
  user: any;

  constructor(
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private userService: UserService,
    private authService: AuthenticationService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      repeatPassword: ['', [Validators.minLength(6)]],
      password: ['', [Validators.minLength(6)]],
    },
      { validator: this.matchValidator }
    );
    this.getuserbyid();
  }


  get registerFormControl() {
    return this.registerForm.controls;
  }

  matchValidator(group: FormGroup) {
    let pass = group.controls.password.value;
    let confirmPass = group.controls.repeatPassword.value;
    console.log(pass, confirmPass, "passwords");
    return pass === confirmPass ? null : { notSame: true }
  }
  checkinput(group: FormGroup) {
    let pass = group.controls.password.value;
    let confirmPass = group.controls.repeatPassword.value;
    console.log(pass, confirmPass, "passwords");
    return pass === confirmPass ? null : { notSame: true }
  }


  imageSelect(v, a) {
    console.log(v, a);
    this.selected = a;
    this.selectedImage = v;
    // this.registerForm.setValue({ image: v });
    if (this.errorImages == true) {
      this.errorImages = false;
    }
  }

  onSubmit() {
    this.submitted = true;
    console.log(this.registerForm.controls["password"].value, "wfa");
    if (this.registerForm.controls["password"].value == '') {
      console.log("true");
    }
    // stop here if form is invalid

    if (this.selectedImage == "" && this.registerForm.controls["password"].value == '') {
      console.log("invalid");
      this.snackBar.open("Nothing Changed Redirecting to blogs", null, {
        duration: 2000,
        panelClass: ['success-snackbar'],
        horizontalPosition: 'right',
        verticalPosition: 'top'
      });

      setTimeout(() => { this.router.navigate(['/blog']); }, 2000)

      return;
    }


    if (this.registerForm.controls['password'].value != "") {
      this.user.Password = this.registerForm.controls["password"].value;
    }
    if (this.selectedImage != "") {
      this.user.Avatar = this.selectedImage;
    }


    console.log(this.user, "dwd");
    this.userService.updateUser(this.user._id, this.user);
    this.snackBar.open("User Updated", null, {
      duration: 2000,
      panelClass: ['success-snackbar'],
      horizontalPosition: 'right',
      verticalPosition: 'top'
    });

    setTimeout(() => { this.router.navigate(['/blog']); }, 2000)

    //   this.AuthService.signup(this.user).subscribe(res => {

    //     console.log(JSON.stringify(res));
    //     if (res == "email already exists") {
    //       this.snackBar.open('Email already exists', "", {
    //         duration: 2000,
    //         panelClass: ['error-snackbar'],
    //         horizontalPosition: 'right',
    //         verticalPosition: 'top'
    //       });
    //     }
    //     else if (res == "Username already exists") {
    //       this.snackBar.open('Username already exists', "", {
    //         duration: 2000,
    //         panelClass: ['error-snackbar'],
    //         horizontalPosition: 'right',
    //         verticalPosition: 'top'
    //       });
    //     }
    //     else {
    //       this.snackBar.open('Registration Successful', "", {
    //         duration: 4000,
    //         panelClass: ['success-snackbar'],
    //         horizontalPosition: 'right',
    //         verticalPosition: 'top'
    //       });
    //       //this.AuthService.signup2(this.user);
    //       //this.router.navigate(['/login']);
    //     }

    //   });
    // }

  }


  getuserbyid() {
    this.userService.getUsersById(this.authService.getuserdetails().id).subscribe(data => {
      this.user = data;

    })
    //  console.log("hello");
    this.user.forEach(value => {
      //   console.log(value, 'daasd')
    })
  }

}
