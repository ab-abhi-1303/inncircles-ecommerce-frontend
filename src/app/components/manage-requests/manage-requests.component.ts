import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatDialog } from '@angular/material/dialog';
import { Request } from '@models/request.model';
import { RequestsService } from '@services/requests.service';
import { UserUtilService } from '@services/user-util.service';
import {
  displayedColumnsByRole,
  requestAttributes,
  RequestStatus,
} from '@utils/constants/request-constants';
import { CreateRequestComponent } from './create-request/create-request.component';
import { ConfirmDialogComponent } from '@shared/components/confirm-dialog/confirm-dialog.component';
import { ChatComponent } from './chat/chat.component';
import { log } from 'console';
import { ChatListComponent } from './chat-list/chat-list.component';

@Component({
  selector: 'app-manage-requests',
  templateUrl: './manage-requests.component.html',
  styleUrl: './manage-requests.component.css',
})
export class ManageRequestsComponent implements OnInit {
  currentUserRequests: Request[] = [];
  displayedAttributes = requestAttributes;
  displayedColumns: string[] = [];
  destroyRef = inject(DestroyRef);
  requestStatuses = RequestStatus;
  dataSource: Request[] = [];
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
    this.displayedColumns = displayedColumnsByRole[this.currentUserRole];
    this.getRequests();
  }

  getRequests() {
    this.requestsService
      .getUserRequests(this.userId)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (requestsData) => {
          this.currentUserRequests = requestsData;
          this.dataSource = [...this.currentUserRequests];
        },
      });
  }

  openChatDialog(requestId: string, requestStatus: string) {
    if (this.currentUserRole === 'Customer')
      this.dialog.open(ChatComponent, {
        data: {
          requestId: requestId,
          requestStatus: requestStatus,
        },
      });
    else
      this.dialog.open(ChatListComponent, {
        data: {
          requests: this.currentUserRequests,
          currentRequestId: requestId,
          requestStatus: requestStatus,
        },
        width: '45rem',
        maxWidth: '45rem',
      });
  }

  openConfirmDialog(dialogMessage: string) {
    return this.dialog.open(ConfirmDialogComponent, {
      data: {
        message: dialogMessage,
        entity: 'request',
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
                this.dataSource = [...this.currentUserRequests];
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
                this.dataSource = [...this.currentUserRequests];
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
          this.dataSource = [...this.currentUserRequests];
          window.alert(
            'Request successfully created! Our support engineers will review it on priority!'
          );
        }
      });
  }
}
