import { CraftGateway } from '../../../../hexagon/gateways/craft.gateway';
import { InventoryRune } from '../../../../hexagon/models/inventory-rune';
import { Item } from '../../../../hexagon/models/item';
import { GameScreenCapture } from './game-screen-capture';
import { recognize } from 'tesseract.js';
import { AttributeType } from '../../../../hexagon/models/attribute';
import { Rune } from '../../../../hexagon/models/rune';
import { MouseGateway } from './mouse.gateway';

export type OCRConfig = {
  inventory: {
    position: {
      x: number;
      y: number;
    };
    slots: {
      count: {
        x: number;
        y: number;
      };
      size: {
        width: number;
        height: number;
      };
    };
  };
};

export class OCRCraftGateway implements CraftGateway {
  constructor(
    private readonly gameScreenCapture: GameScreenCapture,
    private readonly mouseGateway: MouseGateway,
    private readonly config: OCRConfig,
  ) {}

  async applyRune(rune: Rune): Promise<void> {
    return undefined;
  }

  async getInventoryRunes(): Promise<InventoryRune[]> {
    const inventory: InventoryRune[] = [];
    for (let x = 0; x < this.config.inventory.slots.count.x; x++) {
      for (let y = 0; y < this.config.inventory.slots.count.y; y++) {
        const name = await this.getRuneName();
        if (!name) break;
        inventory.push({ name, count: 1 });
      }
    }

    return inventory;
  }

  private async getRuneName() {
    const runeNameImage = await this.gameScreenCapture.getRuneNameImage();
    const result = await recognize(runeNameImage, 'fra');
    return result.data.text
      .trim()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');
  }

  async getItem(): Promise<Item | undefined> {
    return Item.fromSnapshot({
      name: await this.getItemName(),
      attributes: await this.getItemAttributes(),
    });
  }

  private async getItemAttributes() {
    const attributesCapturePath =
      await this.gameScreenCapture.getItemAttributesImage();
    const result = await recognize(attributesCapturePath, 'fra');
    return result.data.text
      .split('\n')
      .filter(Boolean)
      .map((row) => this.getAttributeFromText(row));
  }

  private async getItemName() {
    const itemNameCapturePath = await this.gameScreenCapture.getItemNameImage();
    const result = await recognize(itemNameCapturePath, 'fra');
    return result.data.text.trim();
  }

  private getAttributeFromText(text: string) {
    return {
      type: this.getAttributeType(text),
      value: this.getValueFromText(text),
    };
  }

  private getValueFromText(text: string) {
    return parseInt(text.match(/\d+/)?.[0], 10);
  }

  private getAttributeType(text: string): AttributeType {
    const attributeTypeFromText: Record<AttributeType, string> = {
      luck: 'chance',
      wise: 'sagesse',
      intelligence: 'intelligence',
      agility: 'agilité',
      strength: 'force',
      vitality: 'vitalité',
      damage: 'de dommages',
      'percent-damage': 'les dommages de',
      critical: 'critique',
      initiative: 'initiative',
      prospecting: 'prospection',
      power: 'puissance',
      heals: 'soins',
      range: 'portée',
      pa: 'pa',
      pm: 'pm',
      summon: 'invocation',
      'earth-resistance': 'résistance terre',
      'fire-resistance': 'résistance feu',
      'water-resistance': 'résistance eau',
      'air-resistance': 'résistance air',
      'neutral-resistance': 'résistance neutre',
    };

    for (const [type, keyword] of Object.entries(attributeTypeFromText)) {
      if (text.includes(keyword)) {
        return type as AttributeType;
      }
    }
  }
}
