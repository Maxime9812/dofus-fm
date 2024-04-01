import { OCRCraftGateway } from '../ocr-craft.gateway';
import { StubGameScreenCapture } from '../stub-game-screen-capture';
import { itemBuilder } from '../../../../../hexagon/__tests__/item.builder';
import { inventoryRuneBuilder } from '../../../../../hexagon/__tests__/inventory-rune.builder';
import { StubMouseGateway } from '../stub-mouse.gateway';

const dummyImage = `${__dirname}/images/dummy.png`;
const runePaAgeNameImage = `${__dirname}/images/rune-name.png`;

const itemNameImage = `${__dirname}/images/item-name.png`;
const itemAttributesImage = `${__dirname}/images/item-attributes.png`;

const runeRaAgeNameImage = `${__dirname}/images/rune-ra-age.png`;

const config = {
  inventory: {
    position: {
      x: 0,
      y: 0,
    },
    slots: {
      count: {
        x: 1,
        y: 1,
      },
      size: {
        width: 1,
        height: 1,
      },
    },
  },
};

describe('OCR Craft Gateway', () => {
  let gameScreenCapture: StubGameScreenCapture;
  let ocrCraftGateway: OCRCraftGateway;
  let mouseGateway: StubMouseGateway;

  beforeEach(() => {
    gameScreenCapture = new StubGameScreenCapture(dummyImage);
    mouseGateway = new StubMouseGateway();
    ocrCraftGateway = new OCRCraftGateway(
      gameScreenCapture,
      mouseGateway,
      config,
    );
  });

  describe('Get item', () => {
    it('Should return item', async () => {
      gameScreenCapture.itemNamePath = itemNameImage;
      gameScreenCapture.attributesPath = itemAttributesImage;
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
        gameScreenCapture.itemNamePath = itemNameImage;
        gameScreenCapture.attributesPath = dummyImage;
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
          gameScreenCapture.itemNamePath = itemNameImage;
          gameScreenCapture.attributesPath = itemAttributesImage;
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
          gameScreenCapture.itemNamePath = dummyImage;
          gameScreenCapture.attributesPath = itemAttributesImage;
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
          gameScreenCapture.itemNamePath = dummyImage;
          gameScreenCapture.attributesPath = itemAttributesImage;
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

  describe('Get inventory runes', () => {
    it('Should return empty inventory when no runes', async () => {
      gameScreenCapture.runeNamePaths = [dummyImage];
      const inventoryRunes = await ocrCraftGateway.getInventoryRunes();
      expect(inventoryRunes).toEqual([]);
    });

    it('Should return 1 rune when inventory has 1 rune', async () => {
      gameScreenCapture.runeNamePaths = [runePaAgeNameImage];
      const inventoryRunes = await ocrCraftGateway.getInventoryRunes();

      expect(inventoryRunes).toEqual([
        inventoryRuneBuilder().withName('Rune Pa Age').build(),
      ]);
    });

    it('Should return all runes in inventory', async () => {
      gameScreenCapture.runeNamePaths = [
        runePaAgeNameImage,
        runeRaAgeNameImage,
      ];
      const inventoryRunes = await ocrCraftGateway.getInventoryRunes();

      expect(inventoryRunes).toEqual([
        inventoryRuneBuilder().withName('Rune Pa Age').build(),
        inventoryRuneBuilder().withName('Rune Ra Age').build(),
      ]);
    });
  });
});
