
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ChatbotComponent } from './chatbot.component';
import { ChatbotIconComponent } from './chatbot-icon/chatbot-icon.component';
import { ChatInterfaceComponent } from './chat-interface/chat-interface.component';
import { ChatHeaderComponent } from './chat-header/chat-header.component';
import { ChatInputComponent } from './chat-input/chat-input.component';
import { ChatMessageComponent } from './chat-message/chat-message.component';
import { ChatHistoryComponent } from './chat-history/chat-history.component';

@NgModule({
  declarations: [
    ChatbotComponent,
    ChatbotIconComponent,
    ChatInterfaceComponent,
    ChatHeaderComponent,
    ChatInputComponent,
    ChatMessageComponent,
    ChatHistoryComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [ChatbotComponent]
})
export class ChatbotModule { }
