import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { User, UserCredentials } from '@models/user.model';
import { AuthService } from '@services/auth.service';
import { UserUtilService } from '@services/user-util.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  error: string | undefined = undefined;
  destroyRef = inject(DestroyRef);
  currentPath = '';
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private userUtilService: UserUtilService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      userName: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });
    this.currentPath = this.activatedRoute.snapshot.routeConfig?.path!;
  }

  onSignIn() {
    const userDetails: UserCredentials = {
      username: this.loginForm.controls['userName'].value,
      password: this.loginForm.controls['password'].value,
    };
    this.authService
      .validateUser(userDetails)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (data: User) => {
          this.setUserDetails(data);
          window.alert('Sucessfully logged in!');
        },
        error: () => {
          this.error = 'Please enter valid credentials';
        },
      });
  }

  onSignUp() {
    const userDetails: UserCredentials = {
      username: this.loginForm.controls['userName'].value,
      password: this.loginForm.controls['password'].value,
    };
    this.authService
      .registerUser(userDetails)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (data: User) => {
          this.setUserDetails(data);
          window.alert('Sucessfully registered user!');
        },
        error: (message) => {
          this.error = message.error
            ? message.error.msg
            : 'Please enter valid credentials';
        },
      });
  }

  setUserDetails(data: User) {
    this.error = undefined;
    this.userUtilService.setCurrentUserSession(data);
    this.userUtilService.navigateUser(data.role);
  }
}
