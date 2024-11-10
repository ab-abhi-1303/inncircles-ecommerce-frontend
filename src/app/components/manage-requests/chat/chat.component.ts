import { Component, Inject, Input } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ChatService } from '@services/chat.service';
import { UserUtilService } from '@services/user-util.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css',
})
export class ChatComponent {
  messages: { message: string; senderId: string; timestamp: Date }[] = [];
  userId: string = 'your-user-id';
  messageForm!: FormGroup;

  constructor(
    private chatService: ChatService,
    private userUtilService: UserUtilService,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.userId = this.userUtilService.getCurrentUserId();
  }

  ngOnInit(): void {
    this.messageForm = this.formBuilder.group({
      messageContent: new FormControl<any>(''),
    });
    this.chatService.joinRoom(this.data.requestId);
    this.chatService.receiveMessage().subscribe((data: any) => {
      this.messages.push(data);
    });
  }

  sendMessage(): void {
    this.chatService.sendMessage(
      this.data.requestId,
      this.messageForm.controls['messageContent'].value,
      this.userId
    );
  }
}
