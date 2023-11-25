import { AsyncPipe, JsonPipe, NgIf } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { PentominoActions } from './store/game/game.actions';
import { ComponentType } from './constants/component-type.enum';

import { BackgroundComponent } from './layers/background/background.component';
import { AnimationsComponent } from './layers/animations/animations.component';
import { PentominoShapes } from './constants/pentomino-shapes.enum';
import { BoardComponent } from './layers/board/board.component';
import { selectGameBoard } from './store/game/game.selectors';
import { GameFacade } from './game.facade';

@Component({
  selector: 'katamino-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css'],
  standalone: true,
  imports: [
    BackgroundComponent,
    AnimationsComponent,
    BoardComponent,
    JsonPipe,
    NgIf,
    AsyncPipe,
  ],
  providers: [GameFacade],
})
export class GameComponent implements OnInit {
  private readonly store = inject(Store);
  includedComponents: ComponentType[] = [ComponentType.Rotate];
  excludedComponents: ComponentType[] = [];
  entities$ = this.store.select((state) => state);
  board$ = this.store.select(selectGameBoard);
  // pentominos$ = this.store.select(
  //   selectEntitiesWithFilteredComponents(
  //     this.includedComponents,
  //     this.excludedComponents
  //   )
  // );

  constructor(private gameFacade: GameFacade) {}

  ngOnInit() {
    this.gameFacade.initGameState(this.store);
  }

  test(x: number, y: number): void {
    this.store.dispatch(
      PentominoActions.updateComponentData({
        entityId: PentominoShapes.F,
        currentComponent: ComponentType.Position,
        changes: { x, y },
      })
    );
  }
}
