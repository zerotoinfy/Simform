import { Router } from '@angular/router';
import { ApiService } from './../../../service/api.service';
import { Component, OnInit, NgZone} from '@angular/core';
import { FormGroup, FormBuilder, Validators  } from "@angular/forms";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  submitted = false;
  loginForm: FormGroup;

  constructor(
    public fb: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private apiService: ApiService
  ) {
    this.mainForm();
  }

  ngOnInit() { }

  mainForm() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      password: ['', [Validators.required]]
    })
  }

  // Getter to access form control
  get myForm() {
    return this.loginForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    this.apiService.invokingNavigation();
    if (!this.loginForm.valid) {
      return false;
    } else {
      this.apiService.login(this.loginForm.value).subscribe(
        (res) => {
          var responseData = JSON.stringify(res)
          console.log('User Login Successfully.')
          localStorage.setItem('token', res['token']);
          localStorage.setItem('email', res['email']);
          this.apiService.setLoggedIn(true);
          this.ngZone.run(() => this.router.navigateByUrl('/view-products'))
        }, (error) => {
          console.log('There is An Error: ',error);
          alert("Invalid Login Credentials !!!");
        });
    }
  }
}