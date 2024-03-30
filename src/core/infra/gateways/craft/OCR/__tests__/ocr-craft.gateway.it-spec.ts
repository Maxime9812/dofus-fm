import { OCRCraftGateway } from '../ocr-craft.gateway';
import { StubGameScreenCapture } from '../stub-game-screen-capture';
import { itemBuilder } from '../../../../../hexagon/__tests__/item.builder';

describe('OCR Craft Gateway', () => {
  describe('Get item', () => {
    it('Should return item', async () => {
      const gameScreenCapture = new StubGameScreenCapture();
      gameScreenCapture.itemNamePath = `${__dirname}/images/item-name.png`;
      gameScreenCapture.attributesPath = `${__dirname}/images/item-attributes.png`;
      const ocrCraftGateway = new OCRCraftGateway(gameScreenCapture);
      const item = await ocrCraftGateway.getItem();

      const expectedItem = itemBuilder()
        .withName('Ceinture Toré')
        .withAttributes(
          { type: 'luck', value: 50 },
          { type: 'intelligence', value: 50 },
          { type: 'wise', value: 30 },
          { type: 'vitality', value: 301 },
          { type: 'critical', value: 2 },
          { type: 'damage', value: 5 },
          { type: 'heals', value: 5 },
          { type: 'range', value: 1 },
          { type: 'percent-damage', value: 10 },
          { type: 'prospecting', value: 20 },
        )
        .build();

      expect(item.snapshot).toEqual(expectedItem.snapshot);
    });
    describe('Name', () => {
      it('Should return item with name', async () => {
        const gameScreenCapture = new StubGameScreenCapture();
        gameScreenCapture.itemNamePath = `${__dirname}/images/item-name.png`;
        gameScreenCapture.attributesPath = `${__dirname}/images/item-attributes.png`;
        const ocrCraftGateway = new OCRCraftGateway(gameScreenCapture);
        const item = await ocrCraftGateway.getItem();
        expect(item.snapshot).toEqual(
          expect.objectContaining({
            name: 'Ceinture Toré',
          }),
        );
      });
    });

    describe('Attributes', () => {
      describe('type', () => {
        it('Should return attribute type', async () => {
          const gameScreenCapture = new StubGameScreenCapture();
          gameScreenCapture.itemNamePath = `${__dirname}/images/item-name.png`;
          gameScreenCapture.attributesPath = `${__dirname}/images/item-attributes.png`;
          const ocrCraftGateway = new OCRCraftGateway(gameScreenCapture);
          const item = await ocrCraftGateway.getItem();
          expect(item.snapshot).toEqual(
            expect.objectContaining({
              attributes: expect.arrayContaining([
                expect.objectContaining({
                  type: 'luck',
                }),
                expect.objectContaining({
                  type: 'intelligence',
                }),
                expect.objectContaining({
                  type: 'wise',
                }),
              ]),
            }),
          );
        });
      });
      describe('value', () => {
        it('Should return value for flat attributes', async () => {
          const gameScreenCapture = new StubGameScreenCapture();
          gameScreenCapture.itemNamePath = `${__dirname}/images/item-name.png`;
          gameScreenCapture.attributesPath = `${__dirname}/images/item-attributes.png`;
          const ocrCraftGateway = new OCRCraftGateway(gameScreenCapture);
          const item = await ocrCraftGateway.getItem();
          expect(item.snapshot).toEqual(
            expect.objectContaining({
              attributes: expect.arrayContaining([
                expect.objectContaining({
                  type: 'luck',
                  value: 50,
                }),
                expect.objectContaining({
                  type: 'wise',
                  value: 30,
                }),
              ]),
            }),
          );
        });
        it('Should return value for percent attributes', async () => {
          const gameScreenCapture = new StubGameScreenCapture();
          gameScreenCapture.itemNamePath = `${__dirname}/images/item-name.png`;
          gameScreenCapture.attributesPath = `${__dirname}/images/item-attributes.png`;
          const ocrCraftGateway = new OCRCraftGateway(gameScreenCapture);
          const item = await ocrCraftGateway.getItem();
          expect(item.snapshot).toEqual(
            expect.objectContaining({
              attributes: expect.arrayContaining([
                expect.objectContaining({
                  type: 'percent-damage',
                  value: 10,
                }),
              ]),
            }),
          );
        });
      });
    });
  });
});
