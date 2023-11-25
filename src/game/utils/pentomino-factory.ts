import { EntityComponents } from '../interfaces/components';
import { Pentomino } from '../interfaces/pentomino';
import { PentominoShapes } from '../constants/pentomino-shapes.enum'
import {ComponentType} from '../constants/component-type.enum'

export function createEntity(id: PentominoShapes, components: EntityComponents[]): Pentomino {
  return {
    id,
    components,
  };
}

// ...

export function createEntitiesWithDifferentComponents(count: number): Pentomino[] {
  const entities: Pentomino[] = [];
  for (let i = 0; i < count; i++) {
    const positionX = i * 10; // Разные значения для каждой сущности
    const renderColor = i % 2 === 0 ? 'red' : 'blue'; // Разные цвета для четных и нечетных сущностей
    const entityId = PentominoShapes.F
    const entity = createEntity(
      entityId, 
     [
      {
        type: ComponentType.Position,
        x: positionX,
        y: 0,
      },
      {
        type: ComponentType.Render,
        color: renderColor,
      },
    ]);

    entities.push(entity);
  }
  return entities;
}

// Создаем несколько сущностей с разными данными и отправляем их в хранилище
// const entityCount = 5;

// const entitiesWithDifferentComponents = createEntitiesWithDifferentComponents(entityCount);
// entitiesWithDifferentComponents.forEach(entity => store.dispatch(addEntity({ entity })));
