import { CraftGateway } from '../../gateways/craft.gateway';
import { ItemsRepository } from '../../gateways/items.repository';
import { RunesRepository } from '../../gateways/runes.repository';
import { Rune } from '../../models/rune';
import { Attribute } from '../../models/attribute';
import { Item } from '../../models/item';

export class CreatePerfectRollUseCase {
  constructor(
    private craftGateway: CraftGateway,
    private itemsRepository: ItemsRepository,
    private runesRepository: RunesRepository,
  ) {}

  async execute() {
    const item = await this.craftGateway.getItem();
    const perfectItem = await this.itemsRepository.findByName(item.name);
    await this.rollItem(item, perfectItem);
  }

  private async rollItem(item: Item, perfectItem: Item) {
    if (item.isPerfect(perfectItem)) return;

    const attributeToImprove = item.getAttributeToImprove(perfectItem);

    const runeToApply = await this.getRuneForAttribute(attributeToImprove);

    await this.craftGateway.applyRune(runeToApply);
    await this.rollItem(await this.craftGateway.getItem(), perfectItem);
  }

  private async getRuneForAttribute(attribute: Attribute) {
    const runes = await this.runesRepository.findByType(attribute.type);

    const inventoryRunes = await this.craftGateway.getInventoryRunes();

    const runesInInventory = runes.filter((rune) =>
      inventoryRunes.some((inventoryRune) => inventoryRune.name === rune.name),
    );

    return this.getRuneWithHighestValue(runesInInventory);
  }

  private getRuneWithHighestValue(runes: Rune[]) {
    return runes.sort((a, b) => (b.isMoreThan(a) ? 1 : -1))[0];
  }
}
