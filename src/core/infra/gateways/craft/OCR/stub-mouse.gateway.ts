import { MouseGateway, Position } from './mouse.gateway';

export class StubMouseGateway implements MouseGateway {
  moves: Position[] = [];
  currentPosition: Position = { x: 0, y: 0 };
  clicks: Position[] = [];

  async move(position: Position): Promise<void> {
    this.currentPosition = position;
    this.moves.push(position);
  }

  async click(): Promise<void> {
    this.clicks.push(this.currentPosition);
  }
}
