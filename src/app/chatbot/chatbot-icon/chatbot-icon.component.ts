
import { Component, Input } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-chatbot-icon',
  templateUrl: './chatbot-icon.component.html',
  styleUrls: ['./chatbot-icon.component.scss'],
  animations: [
    trigger('iconState', [
      state('open', style({
        transform: 'rotate(0deg)',
        opacity: 1
      })),
      state('closed', style({
        transform: 'rotate(-90deg)',
        opacity: 0
      })),
      transition('open <=> closed', [
        animate('0.2s')
      ])
    ]),
    trigger('buttonScale', [
      transition(':enter', [
        style({ transform: 'scale(0.8)', opacity: 0 }),
        animate('0.3s ease-out', style({ transform: 'scale(1)', opacity: 1 }))
      ]),
      transition(':leave', [
        animate('0.3s ease-in', style({ transform: 'scale(0.8)', opacity: 0 }))
      ])
    ])
  ]
})
export class ChatbotIconComponent {
  @Input() isOpen = false;
}
