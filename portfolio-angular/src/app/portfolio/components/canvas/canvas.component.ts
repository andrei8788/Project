import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';

@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.css']
})
export class CanvasComponent implements OnInit {
  @ViewChild('canvas') canvas: ElementRef;

  ngOnInit() {
    const ctx = this.canvas.nativeElement.getContext('2d');
    ctx.scale(0.5, 0.5);
    ctx.lineWidth = 0.1;
    ctx.fillStyle = 'magenta';
    ctx.font = '20px Georgia';
    ctx.fillText('Hello world', 50, 50);
  }

}
