import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatDialog } from '@angular/material/dialog';
import { MatSelectChange } from '@angular/material/select';
import { User } from '@models/user.model';
import { UserService } from '@services/user.service';
import { ConfirmDialogComponent } from '@shared/components/confirm-dialog/confirm-dialog.component';
import { userRoles } from '@utils/constants/user-constants';
import { log } from 'console';

@Component({
  selector: 'app-manage-users',
  templateUrl: './manage-users.component.html',
  styleUrl: './manage-users.component.css',
})
export class ManageUsersComponent implements OnInit {
  usersList: User[] = [];
  dataSource = this.usersList;
  destroyRef = inject(DestroyRef);
  displayedColumns = ['username', 'role'];
  allUserRoles = userRoles;

  constructor(private userService: UserService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.getUsersList();
  }

  getUsersList() {
    this.userService
      .getUsers()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (data) => {
          this.usersList = data;
          this.dataSource = this.usersList;
        },
      });
  }

  onRoleChange(userId: string, event: MatSelectChange) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        message: `edit role to '${event.value}' for`,
        entity: `user`,
      },
    });

    dialogRef
      .afterClosed()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((result) => {
        if (result) {
          const updatedUser = { userId: userId, role: event.value };
          this.userService
            .updateUserRole(updatedUser)
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe({
              next: () => {
                const index = this.usersList.findIndex((user: any) => {
                  return user._id === userId;
                });
                this.usersList[index].role = event.value;
                this.dataSource = [...this.usersList];
              },
              error: () => {
                event.source.writeValue(null);
              }
            });
        } else {
          event.source.writeValue(null);
        }
      });
  }
}
