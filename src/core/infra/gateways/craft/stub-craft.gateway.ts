import { CraftGateway } from '../../../hexagon/gateways/craft.gateway';
import { Item } from '../../../hexagon/models/item';
import { InventoryRune } from '../../../hexagon/models/inventory-rune';
import { Rune } from '../../../hexagon/models/rune';

export class StubCraftGateway implements CraftGateway {
  item: Item;
  private itemWithRune: Map<string, Item> = new Map();
  private runes: InventoryRune[] = [];
  async getItem(): Promise<Item | undefined> {
    return this.item;
  }

  async applyRune(rune: Rune): Promise<void> {
    this.item = this.itemWithRune.get(rune.name);
  }

  async getInventoryRunes(): Promise<InventoryRune[]> {
    return this.runes;
  }

  givenInventoryRunes(runes: InventoryRune[]) {
    this.runes = runes;
  }

  givenItemWithRune(rune: Rune, item: Item) {
    this.itemWithRune.set(rune.name, item);
  }
}
