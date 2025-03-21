
export type MessageType = 'user' | 'bot';

export interface ChatMessage {
  id: string;
  message: string;
  type: MessageType;
  timestamp: Date;
}

export interface ChatSession {
  id: string;
  title: string;
  messages: ChatMessage[];
  createdAt: Date;
  updatedAt: Date;
}
