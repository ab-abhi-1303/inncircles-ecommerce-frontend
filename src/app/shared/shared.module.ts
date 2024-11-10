import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { MaterialModule } from '@app/material.module';
import { CheckPermissionsDirective } from './directives/check-permissions.directive';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    HeaderComponent,
    CheckPermissionsDirective,
    ConfirmDialogComponent,
  ],
  imports: [CommonModule, MaterialModule, RouterModule],
  exports: [HeaderComponent, CheckPermissionsDirective, ConfirmDialogComponent],
})
export class SharedModule {}
