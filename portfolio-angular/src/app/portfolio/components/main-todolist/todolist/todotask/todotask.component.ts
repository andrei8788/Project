import { Component, Input, EventEmitter, Output } from '@angular/core';

import {Task} from '../models/app.task';
import {TasksService} from '../../../../shared/services/tasks.service';
import {messageTrigger} from '../../../../../shared/animations/message.animation';

@Component({
  selector: 'app-todotask',
  templateUrl: './todotask.component.html',
  styleUrls: ['./todotask.component.css'],
  animations: [messageTrigger]
})

export class TodotaskComponent {
  @Input() taskItem;
  @Input() idList;
  @Input() counterTask;
  @Output() onCounterTask = new EventEmitter<number>();
  @Output() onDisabledTask = new EventEmitter<boolean>();
  @Output() deleteTask = new EventEmitter<Task>();
  isStateTitle = true;
  isStatePreloader = false;
  disabled = false;
  hover = false;
  message: string;
  statusMessage = false;
  constructor(private tasksService: TasksService) {}

  delete() {
    this.isStatePreloader = true;
    this.disabled = true;
    this.onDisabledTask.emit(this.disabled);
    this.tasksService.deleteTask(this.idList, this.taskItem.id)
      .subscribe((deleteTask: Object) => {
        this.deleteTask.emit(this.taskItem);
        this.isStatePreloader = false;
        if (!this.taskItem.isDone) {
          this.onCounterIncrement();
        }
          this.disabled = false;
          this.onDisabledTask.emit(this.disabled);
      });
  }

  onChange() {
    this.isStatePreloader = true;
    this.disabled = true;
    this.onDisabledTask.emit(this.disabled);
    this.taskItem.isDone = !this.taskItem.isDone;
    this.tasksService.updateTask(this.idList, this.taskItem.id, this.taskItem.title, this.taskItem.isDone)
      .subscribe((data) => {
        this.isStatePreloader = false;
        console.log(data);
        if (this.taskItem.isDone) {
          this.onCounterIncrement();
        } else if (!this.taskItem.isDone) {
          this.onCounterDecrement();
        }
          this.disabled = false;
          this.onDisabledTask.emit(this.disabled);
      });
  }

  changeTitle() {
    this.isStateTitle = !this.isStateTitle;
  }

  saveTitle(title) {
    if (title !== '' && title.length <= 30) {
      this.isStatePreloader = true;
      this.disabled = true;
      this.onDisabledTask.emit(this.disabled);
      this.taskItem.title = title;
      this.tasksService.changeTaskTitle(this.idList, this.taskItem.id, title, this.taskItem.isDone)
        .subscribe((data) => {
          this.isStatePreloader = false;
          this.disabled = false;
          this.onDisabledTask.emit(this.disabled);
        });
      this.isStateTitle = !this.isStateTitle;
    } else if (title === '') {
      this.message = 'Enter value!!!!!!!!!!!!!!!!!';
      this.statusMessage = true;
    } else {
      this.message = 'Enter the correct value where the number of characters is not greater than 30 and is not 0';
      this.statusMessage = true;
    }
  }

  showButtonDelete() {
    this.hover = true;
  }

  hideButtonDelete() {
    this.hover = false;
  }

  onCounterIncrement() {
    this.counterTask--;
    this.onCounterTask.emit(this.counterTask);
  }

  onCounterDecrement() {
    this.counterTask++;
    this.onCounterTask.emit(this.counterTask);
  }

  onStatusMessage(statusMessage) {
    this.statusMessage = statusMessage;
  }
}
