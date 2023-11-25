import { PentominoShapes } from '../constants/pentomino-shapes.enum';
import { EntityComponents } from './components';

export interface Pentomino {
  id: PentominoShapes;
  components: EntityComponents[];
}
