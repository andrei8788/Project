import { Component, OnInit } from '@angular/core';
import {fadeStateTrigger} from '../../shared/animations/fade.animation';

@Component({
  selector: 'app-about-me',
  templateUrl: './about-me.component.html',
  styleUrls: ['./about-me.component.css'],
  animations: [fadeStateTrigger]
})
export class AboutMeComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
