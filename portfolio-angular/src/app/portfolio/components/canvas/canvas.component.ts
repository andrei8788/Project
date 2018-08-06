import {AfterViewInit, Component, ElementRef, Input, ViewChild} from '@angular/core';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.css']
})
export class CanvasComponent implements AfterViewInit {
  @ViewChild('canvas') public canvas: ElementRef;

  public width = 1500;
  public height = 700;

  private cx: CanvasRenderingContext2D;

  public ngAfterViewInit() {
    const canvasEl: HTMLCanvasElement = this.canvas.nativeElement;
    this.cx = canvasEl.getContext('2d');

    canvasEl.width = this.width;
    canvasEl.height = this.height;

    this.cx.lineWidth = 10;
    this.cx.lineCap = 'round';
    this.cx.strokeStyle = '#4d91ff';

    this.captureEvents(canvasEl);
  }

  private captureEvents(canvasEl: HTMLCanvasElement) {
    Observable
      .fromEvent(canvasEl, 'mousedown')
      .switchMap((e) => {
        return Observable
          .fromEvent(canvasEl, 'mousemove')
          .takeUntil(Observable.fromEvent(canvasEl, 'mouseup'))
          .takeUntil(Observable.fromEvent(canvasEl, 'mouseleave'))
          .pairwise()
      })
      .subscribe((res: [MouseEvent, MouseEvent]) => {
        const rect = canvasEl.getBoundingClientRect();

        const prevPos = {
          x: res[0].clientX - rect.left,
          y: res[0].clientY - rect.top
        };

        const currentPos = {
          x: res[1].clientX - rect.left,
          y: res[1].clientY - rect.top
        };

        this.drawOnCanvas(prevPos, currentPos);
      });
  }

  private drawOnCanvas(
    prevPos: { x: number, y: number },
    currentPos: { x: number, y: number }
  ) {

    if (!this.cx) { return; }

    this.cx.beginPath();

    if (prevPos) {
      this.cx.moveTo(prevPos.x, prevPos.y);
      this.cx.lineTo(currentPos.x, currentPos.y);
      this.cx.stroke();
    }
  }

  changeThicknessLine(value1) {
    this.cx.lineWidth = value1;
  }

  changeColor(value2) {
    this.cx.strokeStyle = value2;
  }

  changeTypeLine(value3) {
    this.cx.lineCap = value3;
  }

  eraser() {
    this.cx.strokeStyle = '#fafafa';
  }

  cleanField() {
    this.cx.clearRect(0, 0, this.width, this.height);
  }

}
