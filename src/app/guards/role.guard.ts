import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
} from '@angular/router';
import { UserUtilService } from '@services/user-util.service';

@Injectable({
  providedIn: 'root',
})
export class RoleGuard implements CanActivate {
  constructor(private userUtilService: UserUtilService) {}
  async canActivate(
    _route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean> {
    const currentUserRole = this.userUtilService.getCurrentUserRole();
    const currentRouteRoles: string[] = _route.data['role'];
    const accessPermission = currentRouteRoles.includes(currentUserRole);
    if (!accessPermission) {
      window.alert('You do not have the permission to access this route!');
      this.userUtilService.navigateUser(currentUserRole);
    }
    return accessPermission;
  }
}
