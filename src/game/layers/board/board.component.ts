import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  ViewChild,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

@Component({
  selector: 'game-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css'],
  standalone: true,
})
export class BoardComponent implements AfterViewInit {
  @Input('state') private state$!: Observable<Store>;
  @ViewChild('canvas', { static: true })
  private canvas!: ElementRef<HTMLCanvasElement>;
  myCanvas!: HTMLCanvasElement;
  ctx!: CanvasRenderingContext2D | null;
  cellSize = 32;
  numRows = 3;
  numCols = 3;

  constructor() {}

  ngAfterViewInit() {
    this.myCanvas = this.canvas.nativeElement;
    this.ctx = this.myCanvas.getContext('2d');
    this.myCanvas.width = this.numCols * this.cellSize;
    this.myCanvas.height = this.numRows * this.cellSize;
    this.drawGrid();
  }

  private drawGrid(): void {
    if (!this.ctx) return;
    for (let i = 0; i <= this.numRows; i++) {
      const y = i * this.cellSize;
      this.ctx.beginPath();
      this.ctx.moveTo(0, y);
      this.ctx.lineTo(this.myCanvas.width, y);
      this.ctx.stroke();
    }

    // Вертикальные линии
    for (let i = 0; i <= this.numCols; i++) {
      const x = i * this.cellSize;
      this.ctx.beginPath();
      this.ctx.moveTo(x, 0);
      this.ctx.lineTo(x, this.myCanvas.height);
      this.ctx.stroke();
    }
  }
}
