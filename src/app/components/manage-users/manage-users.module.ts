import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManageUsersComponent } from './manage-users.component';
import { MaterialModule } from '@app/material.module';
import { Route, RouterModule } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';

const routes: Route[] = [
  {
    path: '',
    component: ManageUsersComponent,
  },
];

@NgModule({
  declarations: [ManageUsersComponent],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    MaterialModule,
    SharedModule,
  ],
  exports: [ManageUsersComponent],
})
export class ManageUsersModule {}
