import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Route, RouterModule } from '@angular/router';
import { MaterialModule } from '@app/material.module';
import { ManageRequestsComponent } from './manage-requests.component';
import { SharedModule } from '@shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CreateRequestComponent } from './create-request/create-request.component';
import { ChatComponent } from './chat/chat.component';
import { ChatListComponent } from './chat-list/chat-list.component';

const routes: Route[] = [
  {
    path: '',
    component: ManageRequestsComponent,
  },
];

@NgModule({
  declarations: [
    ManageRequestsComponent,
    CreateRequestComponent,
    ChatComponent,
    ChatListComponent,
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    SharedModule,
  ],
  exports: [
    ManageRequestsComponent,
    CreateRequestComponent,
    ChatComponent,
    ChatListComponent,
  ],
})
export class ManageRequestsModule {}
