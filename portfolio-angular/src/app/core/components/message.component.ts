import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent {
  @Input() message: string;
  @Output() statusMessage = new EventEmitter();

  onStatusMessage(el) {
    const value = el.classList.value;
    if (value === 'close' || value === 'wrap_mod__content') {
      const statusMessage = false;
      this.statusMessage.emit(statusMessage);
    }
  }
}
