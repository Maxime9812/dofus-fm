import { CraftGateway } from '../../gateways/craft.gateway';
import { ItemsRepository } from '../../gateways/items.repository';
import { RunesRepository } from '../../gateways/runes.repository';
import { Rune } from '../../models/rune';
import { Attribute, AttributeType } from '../../models/attribute';
import { Item } from '../../models/item';

export class CreatePerfectRollUseCase {
  constructor(
    private craftGateway: CraftGateway,
    private itemsRepository: ItemsRepository,
    private runesRepository: RunesRepository,
  ) {}

  async execute() {
    const item = await this.craftGateway.getItem();
    await this.rollItem(item);
  }

  private async rollItem(item: Item) {
    const attributeToImprove = await this.getAttributeToImprove(item);

    const isPerfect = !attributeToImprove;
    if (isPerfect) return;

    const runeToApply = await this.getRuneForAttribute(attributeToImprove);

    await this.craftGateway.applyRune(runeToApply.name);
    await this.rollItem(await this.craftGateway.getItem());
  }

  private async getRuneForAttribute(attribute: Attribute) {
    const runes = await this.runesRepository.findByType(attribute.type);

    const runesForType = this.getRunesWithType(runes, attribute.type);
    const inventoryRunes = await this.craftGateway.getInventoryRunes();

    const runesInInventory = runesForType.filter((rune) =>
      inventoryRunes.some((inventoryRune) => inventoryRune.name === rune.name),
    );

    return this.getRuneWithHighestValue(runesInInventory);
  }

  private async getAttributeToImprove(item: Item) {
    const perfectItem = await this.itemsRepository.findByName(item.name);
    return item.getAttributeToImprove(perfectItem);
  }

  private getRuneWithHighestValue(runes: Rune[]) {
    return runes.sort((a, b) => (b.isMoreThan(a) ? 1 : -1))[0];
  }

  private getRunesWithType(runes: Rune[], type: AttributeType) {
    return runes.filter((rune) => rune.isTypeOf(type));
  }
}
