import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/auth/login/login.component';
import { UserRoles } from '@utils/enums/user-enums';
import { AuthGuard } from './guards/auth.guard';
import { RoleGuard } from './guards/role.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'manage-requests',
    loadChildren: () =>
      import('./components/manage-requests/manage-requests.module').then(
        (m) => m.ManageRequestsModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'manage-users',
    loadChildren: () =>
      import('./components/manage-users/manage-users.module').then(
        (m) => m.ManageUsersModule
      ),
    data: {
      role: [UserRoles.Admin],
    },
    canActivate: [AuthGuard, RoleGuard],
  },
  {
    path: '**',
    redirectTo: 'login',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
