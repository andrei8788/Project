import { TasksService } from '../../../../shared/services/tasks.service';
import { FilterValues } from '../../../../shared/enums/app.enums';
import {Task} from './models/app.task';
import {Component, OnInit, Input} from '@angular/core';
import {ITaskFromServerArray} from '../../../../shared/interface/app.interfaceForTasks';

@Component({
  selector: 'app-todolist',
  templateUrl: './todolist.component.html',
  styleUrls: ['./todolist.component.css']
})

export class TodolistComponent implements OnInit {
  @Input() id: number;
  allTasks = [];
  tasks = [];
  counter = 0;
  disabled = false;

  constructor(private tasksService: TasksService) {
  }

  ngOnInit() {
    this.tasksService.getTasks(this.id).subscribe(this._onGetTasksCallbackOfSubscribe());
  }

  private _onGetTasksCallbackOfSubscribe() {
    return (tasksFromServer) => {
      this.tasks = [];
      this.allTasks = [];
      this.tasks = (<ITaskFromServerArray[]>tasksFromServer).map((itemFromJson) => {
        const task = new Task(itemFromJson.title, itemFromJson.done, itemFromJson.id);
        return task;
      });
      this.allTasks = this.tasks;
      const tasksCounter = this.tasks.filter((task) => !task.isDone);
      this.counter = tasksCounter.length;
    };
  }

  onDeleteTask(task) {
    this.tasks = this.allTasks;
    this.tasks.splice(this.tasks.indexOf(task), 1);
  }

  onCreateTask(task) {
    this.allTasks.push(task);
    this.tasks = this.allTasks;
  }

  onFilter(value) {
    if (FilterValues.All === value) {
      this.tasks = this.allTasks;
    }
    if (FilterValues.Active === value) {
      this.tasks = this.allTasks.filter((t) => !t.isDone);
    }
    if (FilterValues.Completed === value) {
      this.tasks = this.allTasks.filter((t) => t.isDone);
    }
  }

  onDisabledTask(disabledTask) {
    this.disabled = disabledTask;
  }

  onDisabledForm(disabledForm) {
    this.disabled = disabledForm;
  }

  onCounterTask(counterTask) {
    this.counter = counterTask;
  }

  onCounterForm(counterForm) {
    this.counter = counterForm;
  }
}
