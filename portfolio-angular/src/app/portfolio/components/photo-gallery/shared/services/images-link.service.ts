export class ImagesLinkService {
  plainBaseUrl = `https://picsum.photos/319/210`;

  modalBaseUrl = `https://picsum.photos/1920/1080`;

  numberArray = [86, 97, 105, 138, 148, 150, 205, 207, 224, 226, 245, 246, 262, 285,
    286, 298, 303, 332, 333, 346, 359, 394, 414, 422, 438, 462, 463, 470, 489, 540, 561,
    578, 587, 589, 592, 595, 597, 601, 624, 632, 636, 644, 647, 673, 697, 706, 707,
    708, 709, 710, 711, 712, 713, 714, 720, 725, 734, 745, 746, 747, 748, 749, 750,
    751, 752, 753, 754, 759, 761, 762, 763, 771, 792, 801, 812, 843, 850, 854, 895,
    897, 899, 917, 920, 934, 956, 963, 968, 1007, 1017, 1030];
  // массив id битых ссылок
  constructor() {}

  plainBaseUrls(i) {
    const lengthArr = this.numberArray.length;
    for (let j = 0; j < lengthArr; j++) {
      if ((i + 12) === this.numberArray[j]) {
        i = i + 12; // увеличеваем i чтобы исключить битую ссылку
      }
    }
    return `${this.plainBaseUrl}?image=${i + 12}&gravity=west`;
  }

  modalBaseUrls(i) {
    const lengthArr = this.numberArray.length;
    for (let j = 0; j < lengthArr; j++) {
      if ((i + 12) === this.numberArray[j]) {
        i = i + 12; // увеличеваем i чтобы исключить битую ссылку
      }
    }
    return `${this.modalBaseUrl}?image=${i + 12}&gravity=west`;
  }

}
