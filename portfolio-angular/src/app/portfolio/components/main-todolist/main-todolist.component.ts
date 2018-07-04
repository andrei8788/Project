import {Component} from '@angular/core';
import {fadeStateTrigger} from '../../../shared/animations/fade.animation';

@Component({
  selector: 'app-main-todolist',
  templateUrl: './main-todolist.component.html',
  styleUrls: ['./main-todolist.component.css'],
  animations: [fadeStateTrigger]
})
export class MainTodolistComponent {}
