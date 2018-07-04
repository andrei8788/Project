import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {fadeStateTrigger} from '../shared/animations/fade.animation';
@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.css'],
  animations: [fadeStateTrigger]
})
export class PortfolioComponent implements OnInit {
  isActive: boolean | null = false;
  constructor(private route: ActivatedRoute) {
  }

  ngOnInit() {
    !this.isActive ? this.isActive = true : this.isActive = false;
    this.route.paramMap.subscribe(params => {
      if (params.get('isActive') !== null) {
        this.isActive = !params.get('isActive');
      }
    });
  }

  onActive() {
    this.isActive = true;

  }

}
