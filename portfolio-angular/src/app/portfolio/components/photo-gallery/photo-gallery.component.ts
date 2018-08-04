import {AfterViewChecked, Component, DoCheck, OnDestroy, OnInit} from '@angular/core';
import {
  GridLayout,
  Image,
  PlainGalleryConfig,
  PlainGalleryStrategy
} from '@ks89/angular-modal-gallery';
import {fadeStateTrigger} from '../../../shared/animations/fade.animation';
import {ImagesLinkService} from '../../shared/services/images-link.service';

@Component({
  selector: 'app-photo-gallery',
  templateUrl: './photo-gallery.component.html',
  styleUrls: ['./photo-gallery.component.css'],
  animations: [fadeStateTrigger]
})
export class PhotoGalleryComponent {

  isActive = false;

  j = 20;

  images: Image[] = this.generateImage(this.j);

  plainGalleryGrid: PlainGalleryConfig = {
    strategy: PlainGalleryStrategy.GRID,
    layout: new GridLayout({ width: '319px', height: '210px' }, { length: 4, wrap: true })
  };

  constructor(private link: ImagesLinkService) {}

  private generateImage(j): Image[] {
    const images = [];
    for (let i = 0; i < j; i++) {
      images.push(
        new Image(
          i + 12,
          {
            img: this.link.modalBaseUrls(i)
          },
          {
            img: this.link.plainBaseUrls(i)
          }
        )
      );
    }
    return images;
  }

  loadImage() {
    this.j = this.j + 20;
    this.images = this.generateImage(this.j);
  }

}
