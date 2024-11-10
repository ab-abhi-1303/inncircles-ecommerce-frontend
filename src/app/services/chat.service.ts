import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private socket: Socket;

  constructor() {
    this.socket = io(environment.webSocketUrl);
  }

  joinRoom(supportRequestId: string): void {
    this.socket.emit('joinRoom', { supportRequestId });
  }

  sendMessage(supportRequestId: string, message: string, senderId: string): void {
    this.socket.emit('message', { supportRequestId, message, senderId });
  }

  receiveMessage(): Observable<any> {
    return new Observable((observer) => {
      this.socket.on('message', (data) => observer.next(data));
    });
  }
}
