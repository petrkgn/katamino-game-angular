import { Inject, inject, Injectable } from '@angular/core';
import { Actions, createEffect } from '@ngrx/effects';
import { filter, map, Observable } from 'rxjs';

import { GameActions, PlayerActions } from './game.actions';
import { KEY_PRESSED } from '../../tokens/key-pressed.token';
import { MOUSE_MOVE } from '../../tokens/mouse-event.token';

@Injectable()
export class GameEffects {
  private readonly actions$ = inject(Actions);
  private readonly keyPressed$ = inject(KEY_PRESSED);
  currentAngle = 0;

  constructor(
    @Inject(KEY_PRESSED) private keyPressed: Observable<string>,
    @Inject(MOUSE_MOVE) private mouseMove$: Observable<MouseEvent>
  ) {}

  mouseEvent$ = createEffect(() =>
    this.mouseMove$.pipe(
      map((e) => PlayerActions.mouseMove({ mx: e.x, my: e.y }))
    )
  );

  keyEvent$ = createEffect(() =>
    this.keyPressed$.pipe(
      filter((e) => e === 'Space'),
      map((e) => {
        if (this.currentAngle >= 270) {
          this.currentAngle = 0;
        } else {
          this.currentAngle += 90;
        }

        return PlayerActions.keyDown({ angle: this.currentAngle });
      })
    )
  );

  gameKeyEvent$ = createEffect(() =>
    this.keyPressed$.pipe(
      filter((e) => e === 'KeyK'),
      map((e) => {
        return GameActions.shapePlacement();
      })
    )
  );
}
