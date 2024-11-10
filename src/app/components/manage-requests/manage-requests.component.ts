import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatDialog } from '@angular/material/dialog';
import { Request } from '@models/request.model';
import { RequestsService } from '@services/requests.service';
import { UserUtilService } from '@services/user-util.service';
import {
  requestAttributes,
  RequestStatus,
} from '@utils/constants/request-constants';
import { CreateRequestComponent } from './create-request/create-request.component';
import { ConfirmDialogComponent } from '@shared/components/confirm-dialog/confirm-dialog.component';
import { ChatComponent } from './chat/chat.component';

@Component({
  selector: 'app-manage-requests',
  templateUrl: './manage-requests.component.html',
  styleUrl: './manage-requests.component.css',
})
export class ManageRequestsComponent implements OnInit {
  currentUserRequests: Request[] = [];
  displayedAttributes = requestAttributes;
  destroyRef = inject(DestroyRef);
  requestStatuses = RequestStatus;
  currentUserRole = '';
  private userId = '';
  constructor(
    private requestsService: RequestsService,
    private userUtilService: UserUtilService,
    private dialog: MatDialog
  ) {
    this.userId = this.userUtilService.getCurrentUserId();
    this.currentUserRole = this.userUtilService.getCurrentUserRole();
  }

  ngOnInit(): void {
    this.getRequests();
  }

  getRequests() {
    this.requestsService
      .getUserRequests(this.userId)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (requestsData) => {
          this.currentUserRequests = requestsData;
        },
      });
  }

  openChatDialog(requestId: string) {
    this.dialog.open(ChatComponent, {
      data: {
        requestId: requestId,
      },
    });
  }

  openConfirmDialog(dialogMessage: string) {
    return this.dialog.open(ConfirmDialogComponent, {
      data: {
        message: dialogMessage,
      },
    });
  }

  updateRequestStatus(
    requestId: string,
    updatedStatus: string,
    message: string
  ) {
    const dialogRef = this.openConfirmDialog(message);
    dialogRef
      .afterClosed()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((result) => {
        if (result) {
          this.requestsService
            .updateStatus(requestId, {
              status: updatedStatus,
              userId: this.userId,
            })
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe({
              next: (updatedRequest) => {
                const index = this.currentUserRequests.findIndex((req) => {
                  return req._id === updatedRequest._id;
                });
                this.currentUserRequests[index].status = updatedStatus;
              },
            });
        }
      });
  }

  deleteRequest(requestId: string) {
    const dialogRef = this.openConfirmDialog('delete');
    dialogRef
      .afterClosed()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((result) => {
        if (result) {
          this.requestsService
            .deleteRequest(requestId, this.userId)
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe({
              next: () => {
                this.currentUserRequests = this.currentUserRequests.filter(
                  (req) => {
                    return req._id !== requestId;
                  }
                );
              },
            });
        }
      });
  }

  openCreateRequestForm() {
    const dialogRef = this.dialog.open(CreateRequestComponent);
    dialogRef
      .afterClosed()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((data: Request) => {
        if (data) {
          this.currentUserRequests.push(data);
          window.alert(
            'Request successfully created! Our support engineers will review it on priority!'
          );
        }
      });
  }
}
