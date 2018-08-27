import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { FilterValues } from '../../shared/enums/app.enums';
@Component({
  selector: 'app-todofiltr',
  templateUrl: './todofiltr.component.html',
  styleUrls: ['./todofiltr.component.css']
})
export class TodofiltrComponent implements OnInit {
  @Output() filter = new EventEmitter();
  @Input() counter: number;
  @Input() disabled: boolean;
  FilterValues = FilterValues;
  stateAll = true;
  stateActive = false;
  stateCompleted = false;
  constructor() { }

  ngOnInit() {}

  all() {
    this.stateAll = true;
    this.stateActive = false;
    this.stateCompleted = false;
  }

  active() {
    this.stateAll = false;
    this.stateActive = true;
    this.stateCompleted = false;
  }

  completed() {
    this.stateAll = false;
    this.stateActive = false;
    this.stateCompleted = true;
  }

  onFilterChange(value: FilterValues) {
    this.filter.emit(value);
  }
}
