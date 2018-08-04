import {Component, Output, EventEmitter, Input} from '@angular/core';
import {Task} from '../models/app.task';
import {TasksService} from '../../../../shared/services/tasks.service';
import {messageTrigger} from '../../../../../shared/animations/message.animation';

@Component({
  selector: 'app-todoform',
  templateUrl: './todoform.component.html',
  styleUrls: ['./todoform.component.css'],
  animations: [messageTrigger]
})

export class TodoformComponent {
  disabled: boolean;
  message: string;
  statusMessage = false;
  @Input() idList;
  @Input() counterForm;
  @Output() onCounterForm = new EventEmitter<number>();
  @Output() onDisabledForm = new EventEmitter<boolean>();
  @Output() createTask = new EventEmitter<Task>();
  isStatePreloader = false;

  constructor(private tasksService: TasksService) {
  }

  create(title: string) {
    if (title !== '' && title.length <= 30) {
      this.disabled = true;
      this.onDisabledForm.emit(this.disabled);
      this.isStatePreloader = true;

      this.tasksService
        .createTask(title, this.idList)
        .subscribe(this._onCreateTaskCallbackOfSubscribe());

    } else if (title.length > 30) {
      this.statusMessage = true;
      this.message = 'The number of characters must not exceed 30!';
    } else if (title === '') {
      this.statusMessage = true;
      this.message = 'Enter value!';
    }
  }

  private _onCreateTaskCallbackOfSubscribe() {
    return (taskFromServer) => {
      const task = new Task(taskFromServer.task.title, taskFromServer.task.done, taskFromServer.task.id);

      this.createTask.emit(task);
      this.isStatePreloader = false;
      this.onCounterDecrement();
      this.disabled = false;
      this.onDisabledForm.emit(this.disabled);
    };
  }

  onCounterDecrement() {
    this.counterForm++;
    this.onCounterForm.emit(this.counterForm);
  }

  onStatusMessage(statusMessage) {
    this.statusMessage = statusMessage;
  }

}
