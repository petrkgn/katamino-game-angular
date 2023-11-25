import { createActionGroup, props, emptyProps } from '@ngrx/store';

import { Pentomino } from '../../interfaces/pentomino';
import { PentominoShapes } from '../../constants/pentomino-shapes.enum';
import { EntityComponents } from '../../interfaces/components';
import { ComponentType } from '../../constants/component-type.enum';

export const PentominoActions = createActionGroup({
  source: 'Entity',
  events: {
    addEntity: props<{ entity: Pentomino }>(),
    updateEntity: props<{ id: number; changes: Partial<Pentomino> }>(),
    deleteEntity: props<{ id: PentominoShapes }>(),
    addComponentToEntity:
      props<{ entityId: PentominoShapes; component: EntityComponents }>(),
    removeComponentFromEntity:
      props<{ entityId: PentominoShapes; currentComponent: ComponentType }>(),
    updateComponentData: props<{
      entityId: PentominoShapes;
      currentComponent: ComponentType;
      changes: Partial<EntityComponents>;
    }>(),
  },
});

export const PlayerActions = createActionGroup({
  source: 'Control',
  events: {
    mouseMove: props<{ mx: number; my: number }>(),
    keyDown: props<{ angle: number }>(),
  },
});

export const GameActions = createActionGroup({
  source: 'Control',
  events: {
    renderShape: props<{ ctx: CanvasRenderingContext2D }>(),
    createBoard: props<{ currentComponent: EntityComponents }>(),
    shapePlacement: emptyProps(),
  },
});
