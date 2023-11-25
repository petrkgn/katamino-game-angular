import { EntityState } from '@ngrx/entity';
import { createFeature, createReducer, on } from '@ngrx/store';

import { Pentomino } from '../../interfaces/pentomino';
import { EntityComponents } from '../../interfaces/components';
import { ComponentType } from '../../constants/component-type.enum';
import { PentominoActions, PlayerActions, GameActions } from './game.actions';
import { updateEntitiesWithComponents } from '../../utils/updates-entities';
import { Board } from '../../interfaces/board';
import { BoardsSize } from '../../constants/board-size';
import { allEntities } from './game.selectors';
import { initialPentominosState, pentominoAdapter } from './pentomino.entity';

export interface GameState {
  pentominoEntities: EntityState<Pentomino>;
  nextLevel: number;
  board: Board;
}

export const initialState: GameState = {
  pentominoEntities: initialPentominosState,
  nextLevel: 0,
  board: {
    id: 'rrtt',
    components: [
      {
        type: ComponentType.Matrix,
        matrix: BoardsSize.firstLevel,
      },
    ],
  },
};

export function changeStateByPentominosState(
  state: GameState,
  pentominosState: EntityState<Pentomino>
): GameState {
  return { ...state, ...{ pentominoEntities: pentominosState } };
}

export const GameFeature = createFeature({
  name: 'Game',
  reducer: createReducer(
    initialState,
    on(PentominoActions.addEntity, (state, { entity }) => {
      return changeStateByPentominosState(
        state,
        pentominoAdapter.addOne(entity, state.pentominoEntities)
      );
    }),
    on(PentominoActions.updateEntity, (state, { id, changes }) => {
      return changeStateByPentominosState(
        state,
        pentominoAdapter.updateOne({ id, changes }, state.pentominoEntities)
      );
    }),
    on(PentominoActions.deleteEntity, (state, { id }) => {
      return changeStateByPentominosState(
        state,
        pentominoAdapter.removeOne(id, state.pentominoEntities)
      );
    }),
    on(
      PentominoActions.addComponentToEntity,
      (state, { entityId, component }) => {
        const currentPentomino = state.pentominoEntities.entities[entityId];
        if (!currentPentomino) return state;

        const updatedPentominosState = pentominoAdapter.updateOne(
          {
            id: entityId,
            changes: {
              components: [...currentPentomino.components, component],
            },
          },
          state.pentominoEntities
        );
        return changeStateByPentominosState(state, updatedPentominosState);
      }
    ),
    on(
      PentominoActions.removeComponentFromEntity,
      (state, { entityId, currentComponent }) => {
        const currentPentomino = state.pentominoEntities.entities[entityId];
        if (!currentPentomino) return state;
        const updatedPentominosState = pentominoAdapter.updateOne(
          {
            id: entityId,
            changes: {
              components: currentPentomino.components.filter(
                (component) => component['type'] !== currentComponent
              ),
            },
          },
          state.pentominoEntities
        );
        return changeStateByPentominosState(state, updatedPentominosState);
      }
    ),
    on(PlayerActions.keyDown, (state, { angle }) => {
      const includedComponents: ComponentType[] = [ComponentType.Rotate];
      const excludedComponents: ComponentType[] = [];
      const updates = updateEntitiesWithComponents(
        state.pentominoEntities,
        includedComponents,
        excludedComponents,
        ComponentType.Rotate,
        { angle }
      );

      return changeStateByPentominosState(
        state,
        pentominoAdapter.updateMany(updates, state.pentominoEntities)
      );
    }),
    on(
      PentominoActions.updateComponentData,
      (state, { entityId, currentComponent, changes }) => {
        if (
          entityId === undefined ||
          currentComponent === undefined ||
          changes === undefined
        ) {
          return state; // Возвращаем исходное состояние, если не указаны все необходимые параметры
        }
        console.log(entityId, currentComponent, changes);
        const updatedPentominosState = pentominoAdapter.updateOne(
          {
            id: entityId,
            changes: {
              components: (
                state.pentominoEntities.entities[entityId]?.components || []
              ).map((component) => {
                if (component.type === currentComponent) {
                  return { ...component, ...changes } as EntityComponents;
                }
                return component as EntityComponents;
              }),
            },
          },
          state.pentominoEntities
        );
        return changeStateByPentominosState(state, updatedPentominosState);
      }
    ),
    on(PlayerActions.mouseMove, (state, { mx, my }) => {
      const includedComponents: ComponentType[] = [ComponentType.Mouse];
      const excludedComponents: ComponentType[] = [ComponentType.IsActiveTag];
      const updates = updateEntitiesWithComponents(
        state.pentominoEntities,
        includedComponents,
        excludedComponents,
        ComponentType.Mouse,
        { mx, my }
      );

      return changeStateByPentominosState(
        state,
        pentominoAdapter.updateMany(updates, state.pentominoEntities)
      );
    }),
    on(GameActions.createBoard, (state, { currentComponent }) => {
      let currentBoardComponents = [...state.board.components];
      currentBoardComponents.push(currentComponent);
      return {
        ...state,
        board: { ...state.board, components: currentBoardComponents },
      };
    }),
    on(GameActions.shapePlacement, (state) => {
      const includedComponents: ComponentType[] = [ComponentType.IsActiveTag];
      const excludedComponents: ComponentType[] = [];
      let pentominos: Pentomino[] = [];
      Object.values(allEntities).map((value) => {
        if (value) pentominos.push(value);
      });
      //  const selectedPentomino = getEntitiesWithComponents(
      //     pentominos,
      //     includedComponents,
      //     excludedComponents
      //   );

      console.log('K is dawn');

      return { ...state };
    })
  ),
});
