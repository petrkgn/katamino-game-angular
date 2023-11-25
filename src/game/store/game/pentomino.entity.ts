import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Pentomino } from '../../interfaces/pentomino';

export interface PentominoEntities extends EntityState<Pentomino> {}

export const pentominoAdapter: EntityAdapter<Pentomino> =
  createEntityAdapter<Pentomino>({
    selectId: (entity) => entity.id,
    sortComparer: false,
  });

export const initialPentominosState = pentominoAdapter.getInitialState();
