import { ComponentType } from '../constants/component-type.enum';

export interface PositionComponent {
  type: ComponentType.Position;
  x: number;
  y: number;
}

export interface MouseComponent {
  type: ComponentType.Mouse;
  mx: number;
  my: number;
}

export interface RenderComponent {
  type: ComponentType.Render;
  color: string;
}

export interface RotateComponent {
  type: ComponentType.Rotate;
  angle: number;
}

export interface IsActiveTag {
  type: ComponentType.IsActiveTag
};

export interface Matrix {
  type: ComponentType.Matrix
  matrix: number[][]
};

export type EntityComponents = 
  PositionComponent | 
  RenderComponent | 
  MouseComponent |
  RotateComponent |
  IsActiveTag |
  Matrix
