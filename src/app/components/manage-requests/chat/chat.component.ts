import {
  Component,
  DestroyRef,
  inject,
  Inject,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ChatService } from '@services/chat.service';
import { UserUtilService } from '@services/user-util.service';
import { requestStatusTimeline } from '@utils/constants/request-constants';
import { Subscription, takeUntil } from 'rxjs';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css',
})
export class ChatComponent implements OnInit, OnChanges {
  @Input() requestId!: string;
  @Input() requestStatus!: string;
  messages: { message: string; senderId: string; timestamp: Date }[] = [];
  userId: string = '';
  requestStatusTimeline = requestStatusTimeline;
  messageForm!: FormGroup;
  destroyRef = inject(DestroyRef);
  subscription!: Subscription;

  constructor(
    private chatService: ChatService,
    private userUtilService: UserUtilService,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA)
    public data: { requestId: string; requestStatus: string }
  ) {
    this.userId = this.userUtilService.getCurrentUserId();
  }

  ngOnInit(): void {
    if (this.data) {
      this.requestId = this.data.requestId;
      this.requestStatus = this.data.requestStatus;
    }
    this.messageForm = this.formBuilder.group({
      messageContent: new FormControl<any>(''),
    });
    this.setChatDetails();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (
      changes['requestId'] &&
      changes['requestId'].previousValue &&
      changes['requestId'].previousValue !== changes['requestId'].currentValue
    ) {
      this.subscription.unsubscribe();
      this.setChatDetails();
      this.messages = [];
    }
  }

  setChatDetails() {
    this.chatService.joinRoom(this.requestId);
    this.subscription = this.chatService
      .receiveMessage()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((data: any) => {
        this.messages.push(data);
      });
  }
  sendMessage(): void {
    this.chatService.sendMessage(
      this.requestId,
      this.messageForm.controls['messageContent'].value,
      this.userId
    );
    this.messageForm.controls['messageContent'].setValue('');
  }
}
