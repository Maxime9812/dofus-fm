import { GameScreenCapture } from './game-screen-capture';

export class StubGameScreenCapture implements GameScreenCapture {
  itemNamePath: string;
  attributesPath: string;

  async getItemNameImage(): Promise<string> {
    return this.itemNamePath;
  }

  async getItemAttributesImage(): Promise<string> {
    return this.attributesPath;
  }
}
