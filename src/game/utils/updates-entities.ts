import { Update } from '@ngrx/entity';
import { ComponentType } from '../constants/component-type.enum';
import { Pentomino } from '../interfaces/pentomino';
import { PentominoEntities } from '../store/game/pentomino.entity';

export function updateEntitiesWithComponents(
  state: PentominoEntities,
  includedComponents: ComponentType[],
  excludedComponents: ComponentType[],
  currentComonentType: ComponentType,
  componentChanges: {}
): Update<Pentomino>[] {
  const updates: Update<Pentomino>[] = [];

  state.ids.forEach((id) => {
    const entity = state.entities[id];

    if (entity) {
      const hasIncludedComponents = includedComponents.every((included) =>
        entity.components.some((component) => component.type === included)
      );
      const hasExcludedComponents = excludedComponents.some((excluded) =>
        entity.components.some((component) => component.type === excluded)
      );

      if (
        hasIncludedComponents &&
        (!hasExcludedComponents || excludedComponents.length === 0)
      ) {
        const currentComponentIndex = entity.components.findIndex(
          (component) => component.type === currentComonentType
        );

        if (currentComponentIndex !== -1) {
          const updatedMouseComponent = {
            ...entity.components[currentComponentIndex],
            ...componentChanges,
          };

          updates.push({
            id: id.toString(),
            changes: {
              components: [
                ...entity.components.slice(0, currentComponentIndex),
                updatedMouseComponent,
                ...entity.components.slice(currentComponentIndex + 1),
              ],
            },
          });
        }
      }
    }
  });
  return updates;
}

export function getEntitiesWithComponents(
  entties: Pentomino[],
  includedComponents: ComponentType[],
  excludedComponents: ComponentType[]
): Pentomino[] {
  const entitiesWithComponents: Pentomino[] = [];

  entties.forEach((entity) => {
    if (entity) {
      const hasIncludedComponents = includedComponents.every((included) =>
        entity.components.some((component) => component.type === included)
      );
      const hasExcludedComponents = excludedComponents.some((excluded) =>
        entity.components.some((component) => component.type === excluded)
      );

      if (
        hasIncludedComponents &&
        (!hasExcludedComponents || excludedComponents.length === 0)
      ) {
        entitiesWithComponents.push(entity);
      }
    }
  });
  return entitiesWithComponents;
}
