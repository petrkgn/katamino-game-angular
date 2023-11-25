import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { GameActions, PentominoActions } from './store/game/game.actions';
import { ComponentType } from './constants/component-type.enum';
import * as utils from './utils/pentomino-factory';
import { PentominoShapes } from './constants/pentomino-shapes.enum';
import { BoardsSize } from './constants/board-size';

@Injectable()
export class GameFacade {
  private pentominoF = utils.createEntity(PentominoShapes.F, [
    {
      type: ComponentType.Position,
      x: 0,
      y: 0,
    },
  ]);
  private pentominoL = utils.createEntity(PentominoShapes.L, [
    {
      type: ComponentType.Position,
      x: 0,
      y: 0,
    },
  ]);

  initGameState(store: Store<any>) {
    store.dispatch(
      GameActions.createBoard({
        currentComponent: {
          type: ComponentType.Matrix,
          matrix: BoardsSize.firstLevel,
        },
      })
    );
    store.dispatch(PentominoActions.addEntity({ entity: this.pentominoF }));
    store.dispatch(PentominoActions.addEntity({ entity: this.pentominoL }));
    store.dispatch(
      PentominoActions.addComponentToEntity({
        entityId: PentominoShapes.L,
        component: {
          type: ComponentType.Mouse,
          mx: 0,
          my: 0,
        },
      })
    );
    store.dispatch(
      PentominoActions.addComponentToEntity({
        entityId: PentominoShapes.F,
        component: {
          type: ComponentType.Mouse,
          mx: 0,
          my: 0,
        },
      })
    );

    store.dispatch(
      PentominoActions.addComponentToEntity({
        entityId: PentominoShapes.L,
        component: { type: ComponentType.IsActiveTag },
      })
    );

    store.dispatch(
      PentominoActions.addComponentToEntity({
        entityId: PentominoShapes.L,
        component: { type: ComponentType.Rotate, angle: 0 },
      })
    );
    // this.mouseSystem.getEntitiesByMouseComponent();
    // this.mouseSystem.mouseMoved();
    setTimeout(
      () =>
        store.dispatch(
          PentominoActions.updateComponentData({
            entityId: PentominoShapes.F,
            currentComponent: ComponentType.Position,
            changes: { x: 345 },
          })
        ),
      5000
    );
  }
}
