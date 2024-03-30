export interface GameScreenCapture {
  getItemNameImage(): Promise<string>;
  getItemAttributesImage(): Promise<string>;
}
