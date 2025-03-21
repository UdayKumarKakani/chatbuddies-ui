
import { Component, OnInit } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';
import { ChatbotService } from '../services/chatbot.service';

@Component({
  selector: 'app-chat-interface',
  templateUrl: './chat-interface.component.html',
  styleUrls: ['./chat-interface.component.scss'],
  animations: [
    trigger('slideIn', [
      transition(':enter', [
        style({ transform: 'translateY(10px)', opacity: 0 }),
        animate('0.3s ease-out', style({ transform: 'translateY(0)', opacity: 1 }))
      ]),
      transition(':leave', [
        animate('0.3s ease-in', style({ transform: 'translateY(10px)', opacity: 0 }))
      ])
    ])
  ]
})
export class ChatInterfaceComponent implements OnInit {
  currentSession$ = this.chatbotService.currentSession$;
  isHistoryOpen = false;
  isMaximized = false;

  constructor(private chatbotService: ChatbotService) {}

  ngOnInit(): void {
    // If there's no active session, create a new one
    this.currentSession$.subscribe(session => {
      if (!session) {
        this.chatbotService.createNewChat();
      }
    });
  }

  toggleHistory(): void {
    this.isHistoryOpen = !this.isHistoryOpen;
  }

  toggleMaximize(): void {
    this.isMaximized = !this.isMaximized;
  }

  closeChatbot(): void {
    this.chatbotService.toggleChatbot();
  }

  onSendMessage(message: string): void {
    this.chatbotService.sendMessage(message);
  }

  onUploadImage(file: File): void {
    this.chatbotService.uploadImage(file);
  }

  onUploadDocument(file: File): void {
    this.chatbotService.uploadDocument(file);
  }
}
