import { Component, DestroyRef, inject, Inject, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Request } from '@models/request.model';
import { RequestsService } from '@services/requests.service';
import { UserUtilService } from '@services/user-util.service';

@Component({
  selector: 'app-create-request',
  templateUrl: './create-request.component.html',
  styleUrl: './create-request.component.css',
})
export class CreateRequestComponent implements OnInit {
  requestForm!: FormGroup;
  userId!: string;
  error: string | undefined;
  destroyRef = inject(DestroyRef);
  constructor(
    private formBuilder: FormBuilder,
    private userUtilService: UserUtilService,
    private requestsService: RequestsService,
    private dialogRef: MatDialogRef<CreateRequestComponent>
  ) {
    this.userId = this.userUtilService.getCurrentUserId();
  }

  ngOnInit() {
    this.requestForm = this.formBuilder.group({
      issueDescription: new FormControl<String>('', Validators.required),
    });
  }

  onSubmit() {
    const newRequest: Request = {
      userId: this.userId,
      issueDescription: this.requestForm.controls['issueDescription'].value,
    };
    this.requestsService
      .addRequest(newRequest)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (data) => {
          this.dialogRef.close(data);
        },
        error: () => {
          this.error = 'API Error, Please try again';
        },
      });
  }
}
