import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { User, UserCredentials } from '@models/user.model';
import { AuthService } from '@services/auth.service';
import { LocalStorageService } from '@services/local-storage.service';
import { UserUtilService } from '@services/user-util.service';
import { STORAGE_KEYS } from '@utils/constants/local-storage-constants';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  error: string | undefined = undefined;
  destroyRef = inject(DestroyRef);
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private userUtilService: UserUtilService
  ) {}

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      userName: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });
  }

  onSubmit() {
    const userDetails: UserCredentials = {
      username: this.loginForm.controls['userName'].value,
      password: this.loginForm.controls['password'].value,
    };
    this.authService
      .validateUser(userDetails)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (data: User) => {
          this.error = undefined;
          this.userUtilService.setCurrentUserSession(data);
          this.userUtilService.navigateUser(data.role);
          window.alert('Sucessfully logged in!');
        },
        error: () => {
          this.error = 'Please enter valid credentials';
        },
      });
  }
}
