import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl, FormGroupDirective, NgForm } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { User } from 'src/app/models/users';
import { RecaptchaErrorParameters } from "ng-recaptcha";
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const invalidCtrl = !!(control && control.invalid && control.parent.dirty);
    const invalidParent = !!(control && control.parent && control.parent.invalid && control.parent.dirty);

    return (invalidCtrl || invalidParent);
  }
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})


export class RegisterComponent implements OnInit {

  matcher = new MyErrorStateMatcher();
  registerForm!: FormGroup;
  loading = false;
  submitted = false;
  selectedImage = "";
  selected = 0;
  checkbox = 0;
  errorCheckbox = false;
  errorImages = false;
  match = false;

  user: User = new User();
  user1: User = new User();

  public tok: any;


  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private AuthService: AuthenticationService,
    private snackBar: MatSnackBar,
  ) { }


  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      username: ['', Validators.required],
      repeatPassword: ['', [Validators.required, Validators.minLength(6)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      country: ['', [Validators.required]],
    },
      { validator: this.matchValidator }
    );
  }
  public checksuccess = 0;
  public checkerror = 0;

  ngAfterViewChecked() {
    if (this.tok)

      if (this.tok.error == undefined && this.checksuccess == 0) {
        this.checksuccess = 1;
        this.snackBar.open('Registration Successful', "", {
          duration: 4000,
          panelClass: ['success-snackbar'],
          horizontalPosition: 'right',
          verticalPosition: 'top'
        });
        //this.AuthService.signup2(this.user);
        this.router.navigate(['/login']);
      }
      else if (this.checkerror == 0) {
        this.checkerror = 1;
        //console.log("this.tok", this.tok.error)
        this.snackBar.open(this.tok.error, "", {
          duration: 2000,
          panelClass: ['error-snackbar'],
          horizontalPosition: 'right',
          verticalPosition: 'top'
        });
      }
  }
  get registerFormControl() {
    return this.registerForm.controls;
  }

  matchValidator(group: FormGroup) {
    let pass = group.controls.password.value;
    let confirmPass = group.controls.repeatPassword.value;
    //console.log(pass, confirmPass, "passwords");
    return pass === confirmPass ? null : { notSame: true }
  }


  imageSelect(v, a) {
    //console.log(v, a);
    this.selected = a;
    this.selectedImage = v;
    // this.registerForm.setValue({ image: v });
    if (this.errorImages == true) {
      this.errorImages = false;
    }

  }
  Checkbox() {
    if (this.checkbox == 0) {
      this.checkbox = 1;
      if (this.errorCheckbox == true) {
        this.errorCheckbox = false;
      }
    }
    else {
      this.checkbox = 0;
      this.errorCheckbox = true;
    }
  }
  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.registerForm.invalid) {

      return;
    }
    if (this.selected == 0) {
      this.errorImages = true;
      return;
    }
    if (this.checkbox == 0) {
      this.errorCheckbox = true;
      return;
    }

    this.loading = true;
    if (this.selected != 0 && this.checkbox != 0) {
      //console.log(this.registerForm.controls["country"].value);
      this.user.Avatar = this.selectedImage;
      this.user.Country = this.registerForm.controls["country"].value;
      this.user.Email = this.registerForm.controls["email"].value;
      this.user.Password = this.registerForm.controls["password"].value;
      this.user.UserName = this.registerForm.controls["username"].value;

      // console.log(this.user, "dwd");
      this.checkerror = 0;
      this.checksuccess = 0;
      this.AuthService.signup(this.user).subscribe(response => {
        this.tok = response;
      },
        (error) => {                           //Error callback
          this.tok = error.error.data
          //console.log(JSON.stringify(res));

        }
      )

    }

  }
  public resolved(captchaResponse: string): void {
    // console.log(`Resolved captcha with response: ${captchaResponse}`);
  }

  public onError(errorDetails: RecaptchaErrorParameters): void {
    // console.log(`reCAPTCHA error encountered; details:`, errorDetails);
  }


}
