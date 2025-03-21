
import { Component, EventEmitter, Output } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';
import { ChatbotService } from '../services/chatbot.service';
import { ChatSession } from '../models/chat.model';

@Component({
  selector: 'app-chat-history',
  templateUrl: './chat-history.component.html',
  styleUrls: ['./chat-history.component.scss'],
  animations: [
    trigger('slideIn', [
      transition(':enter', [
        style({ transform: 'translateX(-20px)', opacity: 0 }),
        animate('0.3s ease-out', style({ transform: 'translateX(0)', opacity: 1 }))
      ])
    ]),
    trigger('itemAnimation', [
      transition(':enter', [
        style({ opacity: 0, x: -10 }),
        animate('0.2s ease-out', style({ opacity: 1, x: 0 }))
      ])
    ])
  ]
})
export class ChatHistoryComponent {
  @Output() closeHistory = new EventEmitter<void>();
  
  sessions$ = this.chatbotService.sessions$;
  currentSession$ = this.chatbotService.currentSession$;

  constructor(private chatbotService: ChatbotService) {}

  selectChat(session: ChatSession): void {
    this.chatbotService.selectChat(session.id);
    this.closeHistory.emit();
  }

  createNewChat(): void {
    this.chatbotService.createNewChat();
    this.closeHistory.emit();
  }

  formatDate(date: Date): string {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    
    if (date.toDateString() === today.toDateString()) {
      return 'Today';
    } else if (date.toDateString() === yesterday.toDateString()) {
      return 'Yesterday';
    } else {
      return date.toLocaleDateString();
    }
  }
}
