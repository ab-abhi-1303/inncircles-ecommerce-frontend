import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from './local-storage.service';
import { UserRoles } from '@utils/enums/user-enums';
import { STORAGE_KEYS } from '@utils/constants/local-storage-constants';
import { User } from '@models/user.model';
import { userRolePermissions } from '@utils/constants/user-constants';

@Injectable({
  providedIn: 'root',
})
export class UserUtilService {
  constructor(
    private router: Router,
    private localStorageService: LocalStorageService
  ) {}

  navigateUser(role: string) {
    switch (role) {
      case UserRoles.Admin:
        this.router.navigateByUrl('/manage-users');
        break;
      case UserRoles.Customer:
      case UserRoles.SupportEngineer:
        this.router.navigateByUrl('/manage-requests');
        break;
      default:
        break;
    }
  }

  checkUserPermission(permission: string) {
    const currentRole = this.getCurrentUserRole();
    const currentUserPermissions = userRolePermissions[currentRole];
    return currentUserPermissions.includes(permission);
  }

  setCurrentUserSession(userData: User) {
    this.localStorageService.setItem(STORAGE_KEYS.userSession, userData);
  }

  getCurrentUserId() {
    const user = this.localStorageService.getItem(
      STORAGE_KEYS.userSession
    ) as User;
    return user.id;
  }

  getCurrentUserRole() {
    const user = this.localStorageService.getItem(
      STORAGE_KEYS.userSession
    ) as User;
    return user.role;
  }
}
