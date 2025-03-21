
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-chat-header',
  templateUrl: './chat-header.component.html',
  styleUrls: ['./chat-header.component.scss'],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('0.3s ease-out', style({ opacity: 1 }))
      ])
    ])
  ]
})
export class ChatHeaderComponent {
  @Input() title = 'Chat';
  @Input() isMaximized = false;
  @Input() showHistoryButton = true;
  
  @Output() toggleHistory = new EventEmitter<void>();
  @Output() toggleMaximize = new EventEmitter<void>();
  @Output() close = new EventEmitter<void>();
}
