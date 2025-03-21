
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ChatMessage, ChatSession, MessageType } from '../models/chat.model';

@Injectable({
  providedIn: 'root'
})
export class ChatbotService {
  private currentSessionSubject = new BehaviorSubject<ChatSession | null>(null);
  private sessionsSubject = new BehaviorSubject<ChatSession[]>([]);
  private isOpenSubject = new BehaviorSubject<boolean>(false);

  constructor() {
    // Load chat history from localStorage
    this.loadChatHistory();
  }

  get currentSession$(): Observable<ChatSession | null> {
    return this.currentSessionSubject.asObservable();
  }

  get sessions$(): Observable<ChatSession[]> {
    return this.sessionsSubject.asObservable();
  }

  get isOpen$(): Observable<boolean> {
    return this.isOpenSubject.asObservable();
  }

  toggleChatbot(): void {
    this.isOpenSubject.next(!this.isOpenSubject.value);
  }

  createNewChat(): void {
    const newSession: ChatSession = {
      id: this.generateId(),
      title: `Chat ${this.sessionsSubject.value.length + 1}`,
      messages: [],
      createdAt: new Date(),
      updatedAt: new Date()
    };

    const updatedSessions = [newSession, ...this.sessionsSubject.value];
    this.sessionsSubject.next(updatedSessions);
    this.currentSessionSubject.next(newSession);
    this.saveChatHistory();
  }

  selectChat(sessionId: string): void {
    const session = this.sessionsSubject.value.find(s => s.id === sessionId);
    if (session) {
      this.currentSessionSubject.next(session);
    }
  }

  sendMessage(message: string): void {
    if (!message.trim()) return;

    let currentSession = this.currentSessionSubject.value;
    if (!currentSession) {
      this.createNewChat();
      currentSession = this.currentSessionSubject.value;
    }

    if (currentSession) {
      const userMessage: ChatMessage = {
        id: this.generateId(),
        message,
        type: 'user',
        timestamp: new Date()
      };

      const updatedMessages = [...currentSession.messages, userMessage];
      
      const updatedSession: ChatSession = {
        ...currentSession,
        messages: updatedMessages,
        updatedAt: new Date()
      };

      // Update the title for new chats
      if (updatedSession.messages.length === 1) {
        updatedSession.title = message.slice(0, 20) + (message.length > 20 ? '...' : '');
      }

      this.updateSession(updatedSession);
      
      // Simulate a bot response
      setTimeout(() => {
        this.simulateBotResponse(updatedSession.id);
      }, 1000);
    }
  }

  uploadImage(file: File): void {
    this.handleFileUpload(file, 'Image uploaded: ' + file.name);
  }

  uploadDocument(file: File): void {
    this.handleFileUpload(file, 'Document uploaded: ' + file.name);
  }

  private handleFileUpload(file: File, message: string): void {
    let currentSession = this.currentSessionSubject.value;
    if (!currentSession) {
      this.createNewChat();
      currentSession = this.currentSessionSubject.value;
    }

    if (currentSession) {
      const userMessage: ChatMessage = {
        id: this.generateId(),
        message,
        type: 'user',
        timestamp: new Date()
      };

      const updatedMessages = [...currentSession.messages, userMessage];
      
      const updatedSession: ChatSession = {
        ...currentSession,
        messages: updatedMessages,
        updatedAt: new Date()
      };

      this.updateSession(updatedSession);
      
      // Simulate a bot response acknowledging the file
      setTimeout(() => {
        this.simulateBotResponse(updatedSession.id, `I've received your ${file.type.includes('image') ? 'image' : 'document'}.`);
      }, 1000);
    }
  }

  private simulateBotResponse(sessionId: string, customMessage?: string): void {
    const sessions = this.sessionsSubject.value;
    const sessionIndex = sessions.findIndex(s => s.id === sessionId);
    
    if (sessionIndex !== -1) {
      const session = sessions[sessionIndex];
      
      const botMessage: ChatMessage = {
        id: this.generateId(),
        message: customMessage || 'This is a simulated response. The actual processing would be handled by your backend API.',
        type: 'bot',
        timestamp: new Date()
      };

      const updatedSession: ChatSession = {
        ...session,
        messages: [...session.messages, botMessage],
        updatedAt: new Date()
      };

      this.updateSession(updatedSession);
    }
  }

  private updateSession(updatedSession: ChatSession): void {
    const sessions = this.sessionsSubject.value;
    const sessionIndex = sessions.findIndex(s => s.id === updatedSession.id);
    
    if (sessionIndex !== -1) {
      const updatedSessions = [...sessions];
      updatedSessions[sessionIndex] = updatedSession;
      this.sessionsSubject.next(updatedSessions);
      this.currentSessionSubject.next(updatedSession);
      this.saveChatHistory();
    }
  }

  private generateId(): string {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }

  private saveChatHistory(): void {
    localStorage.setItem('chatSessions', JSON.stringify(this.sessionsSubject.value));
  }

  private loadChatHistory(): void {
    const savedSessions = localStorage.getItem('chatSessions');
    if (savedSessions) {
      try {
        const sessions: ChatSession[] = JSON.parse(savedSessions);
        
        // Convert string dates back to Date objects
        const fixedSessions = sessions.map(session => ({
          ...session,
          createdAt: new Date(session.createdAt),
          updatedAt: new Date(session.updatedAt),
          messages: session.messages.map(msg => ({
            ...msg,
            timestamp: new Date(msg.timestamp)
          }))
        }));
        
        this.sessionsSubject.next(fixedSessions);
        
        // Set the most recent session as current
        if (fixedSessions.length > 0) {
          this.currentSessionSubject.next(fixedSessions[0]);
        }
      } catch (error) {
        console.error('Error loading chat history:', error);
      }
    }
  }
}
