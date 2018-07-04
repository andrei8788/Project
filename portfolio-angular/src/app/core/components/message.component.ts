import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent {
  @Input() message: string;
  @Output() statusMessage = new EventEmitter();

  onStatusMessage(statusMessage) {
    statusMessage = false;
    this.statusMessage.emit(statusMessage);
  }
}
