export type Position = {
  x: number;
  y: number;
};

export interface MouseGateway {
  move(position: Position): Promise<void>;
  click(): Promise<void>;
}
