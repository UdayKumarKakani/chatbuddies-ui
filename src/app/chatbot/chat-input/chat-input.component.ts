
import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-chat-input',
  templateUrl: './chat-input.component.html',
  styleUrls: ['./chat-input.component.scss'],
  animations: [
    trigger('optionsAnimation', [
      transition(':enter', [
        style({ opacity: 0, y: 10, scale: 0.95 }),
        animate('0.2s ease-out', style({ opacity: 1, y: 0, scale: 1 }))
      ]),
      transition(':leave', [
        animate('0.2s ease-in', style({ opacity: 0, y: 10, scale: 0.95 }))
      ])
    ]),
    trigger('optionAnimation', [
      transition(':enter', [
        style({ opacity: 0, x: -10 }),
        animate('0.2s ease-out', style({ opacity: 1, x: 0 }))
      ])
    ])
  ]
})
export class ChatInputComponent implements OnInit {
  @Output() sendMessage = new EventEmitter<string>();
  @Output() uploadImage = new EventEmitter<File>();
  @Output() uploadDocument = new EventEmitter<File>();

  @ViewChild('imageInput') imageInput: ElementRef;
  @ViewChild('documentInput') documentInput: ElementRef;

  message = '';
  showOptions = false;

  constructor(private elementRef: ElementRef) {}

  ngOnInit(): void {
    // Listen for clicks outside the options menu to close it
    document.addEventListener('mousedown', this.onClickOutside.bind(this));
  }

  ngOnDestroy(): void {
    document.removeEventListener('mousedown', this.onClickOutside.bind(this));
  }

  onClickOutside(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    const optionsContainer = this.elementRef.nativeElement.querySelector('#chatbot-options');
    const plusButton = this.elementRef.nativeElement.querySelector('#plus-button');
    
    if (this.showOptions && 
        optionsContainer && 
        !optionsContainer.contains(target) && 
        plusButton && 
        !plusButton.contains(target)) {
      this.showOptions = false;
    }
  }

  toggleOptions(): void {
    this.showOptions = !this.showOptions;
  }

  handleSubmit(): void {
    if (this.message.trim()) {
      this.sendMessage.emit(this.message);
      this.message = '';
    }
  }

  triggerImageUpload(): void {
    this.imageInput.nativeElement.click();
    this.showOptions = false;
  }

  triggerDocumentUpload(): void {
    this.documentInput.nativeElement.click();
    this.showOptions = false;
  }

  handleImageUpload(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.uploadImage.emit(input.files[0]);
      input.value = '';
    }
  }

  handleDocumentUpload(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.uploadDocument.emit(input.files[0]);
      input.value = '';
    }
  }
}
