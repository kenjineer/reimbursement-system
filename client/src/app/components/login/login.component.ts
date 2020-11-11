import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  formGroup: FormGroup;

  constructor(private loginService: LoginService, private router: Router) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.formGroup = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });
  }

  doLogin() {
    if (this.formGroup.valid) {
      this.loginService.login(this.formGroup.value).subscribe(
        (res) => {
          this.loginService.setLocalStorage(res);
          console.log(res);
          alert(res.message);
          this.router.navigate(['api/dashboard']);
        },
        (err) => {
          console.log(err);
          alert(`${err.error.message}\n${err.error.jwt.message}`);
        }
      );
    }
  }
}
