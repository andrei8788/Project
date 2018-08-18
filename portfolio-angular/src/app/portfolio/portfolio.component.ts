import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {fadeStateTrigger} from '../shared/animations/fade.animation';
import {Subscription} from 'rxjs/Subscription';
@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.css'],
  animations: [fadeStateTrigger]
})
export class PortfolioComponent implements OnInit, OnDestroy {
  @ViewChild('nav') style: ElementRef;
  isActive: boolean | null = false;

  subscription: Subscription;

  constructor(private route: ActivatedRoute) {
  }

  ngOnInit() {
    !this.isActive ? this.isActive = true : this.isActive = false;
    this.subscription = this.route.paramMap.subscribe(params => {
      if (params.get('isActive') !== null) {
        this.isActive = !params.get('isActive');
      }
    });

    window.addEventListener('scroll', this.onScroll.bind(this));
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

  onScroll(e) {
    const position = e.path[1].pageYOffset;
    if (this.style === undefined) {
      return;
    } else {
      if(position > 49) {
        this.style.nativeElement.style.opacity = 0;
        this.style.nativeElement.style['z-index'] = -1;
      } else {
        this.style.nativeElement.style.opacity = 1;
        this.style.nativeElement.style['z-index'] = 1;
      }
    }

  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
