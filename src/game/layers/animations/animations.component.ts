import {
  AfterViewInit,
  Component,
  ElementRef,
  inject,
  Input,
  ViewChild,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { AsyncPipe, JsonPipe, NgIf } from '@angular/common';
import { map, Observable } from 'rxjs';

import * as gameSelectors from '../../store/game/game.selectors';
import { allEntities } from '../../store/game/game.selectors';

@Component({
  selector: 'game-animations',
  templateUrl: './animations.component.html',
  imports: [JsonPipe, NgIf, AsyncPipe],
  styleUrls: ['./animations.component.css'],
  standalone: true,
})
export class AnimationsComponent implements AfterViewInit {
  @Input('state') private state$!: Observable<Store>;
  @ViewChild('canvas', { static: true })
  private canvas!: ElementRef<HTMLCanvasElement>;
  @ViewChild('img', { static: true })
  private img!: ElementRef<HTMLCanvasElement>;

  private store = inject(Store);
  // private entities$ = this.store.select((state) => state.pentomino.entities);
  private animationsCanvas!: HTMLCanvasElement;
  private ctx!: CanvasRenderingContext2D | null;
  data = this.store.select(allEntities);
  gameData = this.store.select(gameSelectors.selectGameBoard);
  angle = 0;
  constructor() {}

  ngAfterViewInit() {
    this.initCanvas();
    this.renderingShape();
  }

  initCanvas(): void {
    this.animationsCanvas = this.canvas.nativeElement;
    this.ctx = this.animationsCanvas.getContext('2d');
  }

  renderingShape(): void {
    // console.log(this.canvas);
    this.data
      .pipe(
        map((entity) => {
          if (this.ctx) {
            this.angle =
              entity[2]?.components[3].type === 3
                ? entity[2]?.components[3].angle
                : 0;
            let x =
              entity[0]?.components[1].type === 2
                ? entity[0]?.components[1].mx
                : 0;
            // console.log('???', angle);
            let y =
              entity[0]?.components[1].type === 2
                ? entity[0]?.components[1].my
                : 0;
            const shape = this.img.nativeElement;
            const positionX =
              x - this.animationsCanvas.getBoundingClientRect().left;
            const positionY =
              y - this.animationsCanvas.getBoundingClientRect().top;
            //  this.ctx.fillStyle = 'red';
            this.ctx.clearRect(0, 0, 600, 300);
            this.ctx.save();
            this.ctx.beginPath();
            this.ctx.translate(positionX, positionY);
            this.ctx.rotate((Math.PI / 180) * this.angle);
            this.ctx.translate(-positionX, -positionY);
            this.ctx.drawImage(
              shape,
              positionX - 96 / 2,
              positionY - 96 / 2,
              96,
              96
            );
            this.ctx.fill();
            this.ctx.restore();
          }
          return entity;
        })
      )
      .subscribe();
  }
}
