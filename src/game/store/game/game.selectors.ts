import { createSelector } from '@ngrx/store';

import { ComponentType } from '../../constants/component-type.enum';
import { getEntitiesWithComponents } from '../../utils/updates-entities';
import { pentominoAdapter } from './pentomino.entity';
import { Pentomino } from '../../interfaces/pentomino';
import { GameFeature } from './game.reducer';

const { selectIds, selectEntities, selectAll, selectTotal } =
  pentominoAdapter.getSelectors();

const {
  // name: GameFatureKeys,
  // reducer: GameReducer,
  selectPentominoEntities,
  selectBoard,
  selectGameState,
} = GameFeature;

export const allEntities = createSelector(
  selectPentominoEntities,
  selectEntities
);

export const selectGameBoard = selectBoard


export const selectEntitiesWithFilteredComponents = (
  includedComponents: ComponentType[],
  excludedComponents: ComponentType[]
) =>
  createSelector(allEntities, (entities) => {
    let pentominos: Pentomino[] = [];
    Object.values(entities).map((value) => {
      if (value) pentominos.push(value);
    });
    console.log('!!!!', pentominos);
    return getEntitiesWithComponents(
      pentominos,
      includedComponents,
      excludedComponents
    );
  });
