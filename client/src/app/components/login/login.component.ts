import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginService } from 'src/app/services/login/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  formGroup: FormGroup;

  constructor(private loginService: LoginService) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.formGroup = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });
  }

  loginProcess() {
    if (this.formGroup.valid) {
      this.loginService.login(this.formGroup.value).subscribe(
        (result) => {
          console.log(result);
          alert(result.message);
        },
        (err) => {
          console.log(err);
          alert(`${err.error.message}\n${err.error.jwt.message}`);
        }
      );
    }
  }
}
