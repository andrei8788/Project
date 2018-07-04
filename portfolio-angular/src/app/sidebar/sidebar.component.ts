import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  isActive = false;

  ngOnInit() {
  }

  buttonActive() {
    this.isActive = !this.isActive;
  }

}
