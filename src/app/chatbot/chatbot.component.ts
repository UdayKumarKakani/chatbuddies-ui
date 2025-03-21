
import { Component } from '@angular/core';
import { ChatbotService } from './services/chatbot.service';

@Component({
  selector: 'app-chatbot',
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.scss']
})
export class ChatbotComponent {
  isOpen$ = this.chatbotService.isOpen$;

  constructor(private chatbotService: ChatbotService) {}

  toggleChatbot(): void {
    this.chatbotService.toggleChatbot();
  }
}
