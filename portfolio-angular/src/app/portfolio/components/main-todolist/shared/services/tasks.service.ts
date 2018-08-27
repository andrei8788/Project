import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {ITaskFromServer, ITaskFromServerArray} from '../interface/app.interfaceForTasks';

@Injectable()
export class TasksService {

  base_url = 'https://repetitora.net/api/JS/Tasks';

  constructor(private http: HttpClient) {
  }

  getTasks(id): Observable<ITaskFromServerArray[]> {
    return this.http
      .get<ITaskFromServerArray[]>(`${this.base_url}?page=1&widgetId=${id}&count=50`);
  }

  createTask(title, id): Observable<ITaskFromServer> {
    const data = {
      title: title,
      widgetId: id
    };
    return this.http
      .post<ITaskFromServer>(this.base_url, data);
  }

  deleteTask(widgetId, taskId) {
    return this.http
      .delete(`${this.base_url}?page=1&widgetId=${widgetId}&taskId=${taskId}`);
  }

  updateTask(widgetId, taskId, title, isDone) {
    const data = {
      taskId: taskId,
      title: title,
      widgetId: widgetId,
      done: isDone
    };
    return this.http
      .put(this.base_url, data);
  }

  changeTaskTitle(widgetId, taskId, title, isDone) {
    const data = {
      taskId: taskId,
      title: title,
      widgetId: widgetId,
      done: isDone
    };
    return this.http
      .put(this.base_url, data);
  }
}
