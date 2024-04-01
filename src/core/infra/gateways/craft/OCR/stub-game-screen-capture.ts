import { GameScreenCapture } from './game-screen-capture';

export class StubGameScreenCapture implements GameScreenCapture {
  itemNamePath: string;
  attributesPath: string;
  runeNamePaths: string[];

  constructor(private readonly dummyImagePath: string) {}

  private runeNameCount = 0;

  async getItemNameImage(): Promise<string> {
    return this.itemNamePath;
  }

  async getItemAttributesImage(): Promise<string> {
    return this.attributesPath;
  }

  async getRuneNameImage(): Promise<string> {
    const path = this.runeNamePaths[this.runeNameCount++];
    return path || this.dummyImagePath;
  }
}
