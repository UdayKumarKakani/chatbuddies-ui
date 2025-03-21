
import { Component, Input } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';
import { MessageType } from '../models/chat.model';

@Component({
  selector: 'app-chat-message',
  templateUrl: './chat-message.component.html',
  styleUrls: ['./chat-message.component.scss'],
  animations: [
    trigger('messageAnimation', [
      transition(':enter', [
        style({ opacity: 0, y: 20 }),
        animate('0.3s ease-out', style({ opacity: 1, y: 0 }))
      ]),
      transition(':leave', [
        animate('0.3s ease-in', style({ opacity: 0 }))
      ])
    ])
  ]
})
export class ChatMessageComponent {
  @Input() message = '';
  @Input() type: MessageType = 'user';
  @Input() timestamp: Date = new Date();
  @Input() isLast = false;
}
