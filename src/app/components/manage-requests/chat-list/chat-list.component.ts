import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Request } from '@models/request.model';

@Component({
  selector: 'app-chat-list',
  templateUrl: './chat-list.component.html',
  styleUrl: './chat-list.component.css',
})
export class ChatListComponent implements OnInit {
  selectedRequestId!: string;
  selectedRequestStatus!: string;
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: {
      requests: Request[];
      currentRequestId: string;
      requestStatus: string;
    }
  ) {}

  ngOnInit(): void {
    this.selectedRequestId = this.data.currentRequestId;
    this.selectedRequestStatus = this.data.requestStatus;
  }

  setChatDetails(requestId: string) {
    this.selectedRequestId = requestId;
  }
}
