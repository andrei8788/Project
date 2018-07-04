import {Component, HostBinding} from '@angular/core';
import {GridLayout, Image, PlainGalleryConfig, PlainGalleryStrategy} from '@ks89/angular-modal-gallery';
import {fadeStateTrigger} from '../../../shared/animations/fade.animation';

@Component({
  selector: 'app-photo-gallery',
  templateUrl: './photo-gallery.component.html',
  styleUrls: ['./photo-gallery.component.css'],
  animations: [fadeStateTrigger]
})
export class PhotoGalleryComponent {

  isActive = false;

  images: Image[] = [
    new Image(
      0,
      {
        img: '../../../../assets/photo-gallery-thumb/1.jpg'
      },
      {
        img: '../../../../assets/photo-gallery-mini/1.jpg'
      }
    ),
    new Image(
      1,
      {
        img: '../../../../assets/photo-gallery-thumb/2.jpg'
      },
      {
        img: '../../../../assets/photo-gallery-mini/2.jpg'
      }
    ),
    new Image(
      2,
      {
        img: '../../../../assets/photo-gallery-thumb/3.jpg'
      },
      {
        img: '../../../../assets/photo-gallery-mini/3.jpg'
      }
    ),
    new Image(
      3,
      {
        img: '../../../../assets/photo-gallery-thumb/4.jpg'
      },
      {
        img: '../../../../assets/photo-gallery-mini/4.jpg'
      }
    ),
    new Image(
      4,
      {
        img: '../../../../assets/photo-gallery-thumb/5.jpg'
      },
      {
        img: '../../../../assets/photo-gallery-mini/5.jpg'
      }
    ),
    new Image(
      5,
      {
        img: '../../../../assets/photo-gallery-thumb/6.jpg'
      },
      {
        img: '../../../../assets/photo-gallery-mini/6.jpg'
      }
    ),
    new Image(
      6,
      {
        img: '../../../../assets/photo-gallery-thumb/7.jpg'
      },
      {
        img: '../../../../assets/photo-gallery-mini/7.jpg'
      }
    ),
    new Image(
      7,
      {
        img: '../../../../assets/photo-gallery-thumb/8.jpg'
      },
      {
        img: '../../../../assets/photo-gallery-mini/8.jpg'
      }
    ),
    new Image(
      8,
      {
        img: '../../../../assets/photo-gallery-thumb/9.jpg'
      },
      {
        img: '../../../../assets/photo-gallery-mini/9.jpg'
      }
    ),
    new Image(
      9,
      {
        img: '../../../../assets/photo-gallery-thumb/10.jpg'
      },
      {
        img: '../../../../assets/photo-gallery-mini/10.jpg'
      }
    ),
    new Image(
      10,
      {
        img: '../../../../assets/photo-gallery-thumb/11.jpg'
      },
      {
        img: '../../../../assets/photo-gallery-mini/11.jpg'
      }
    ),
    new Image(
      11,
      {
        img: '../../../../assets/photo-gallery-thumb/12.jpg'
      },
      {
        img: '../../../../assets/photo-gallery-mini/12.jpg'
      }
    ),
    new Image(
      12,
      {
        img: '../../../../assets/photo-gallery-thumb/13.jpg'
      },
      {
        img: '../../../../assets/photo-gallery-mini/13.jpg'
      }
    ),
    new Image(
      13,
      {
        img: '../../../../assets/photo-gallery-thumb/14.jpg'
      },
      {
        img: '../../../../assets/photo-gallery-mini/14.jpg'
      }
    ),
    new Image(
      14,
      {
        img: '../../../../assets/photo-gallery-thumb/15.jpg'
      },
      {
        img: '../../../../assets/photo-gallery-mini/15.jpg'
      }
    ),
    new Image(
      15,
      {
        img: '../../../../assets/photo-gallery-thumb/16.jpg'
      },
      {
        img: '../../../../assets/photo-gallery-mini/16.jpg'
      }
    )
  ];

  plainGalleryGrid: PlainGalleryConfig = {
    strategy: PlainGalleryStrategy.GRID,
    layout: new GridLayout({ width: '319px', height: '210px' }, { length: 4, wrap: true })
  };

}
