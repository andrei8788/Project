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

  handleEnter(block, background, dropdown, nav) {
    block.classList.add('trigger-enter');
    setTimeout(() => block.classList.contains('trigger-enter') && block.classList.add('trigger-enter-active'), 150);
    background.classList.add('open');

    const dropdownCoords = dropdown.getBoundingClientRect();
    const navCoords = nav.getBoundingClientRect();

    const coords = {
      height: dropdownCoords.height,
      width: dropdownCoords.width,
      top: dropdownCoords.top - navCoords.top,
      left: dropdownCoords.left - navCoords.left
    };
    background.style.setProperty('width', `${coords.width}px`);
    background.style.setProperty('height', `${coords.height}px`);
    background.style.setProperty('transform', `translate(${coords.left}px, ${coords.top}px)`);
  }

  handleLeave(block, background) {
    block.classList.remove('trigger-enter', 'trigger-enter-active');
    background.classList.remove('open');
  }

  onActive() {
    this.isActive = true;

  }

}
