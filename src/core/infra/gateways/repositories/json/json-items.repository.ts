import { ItemsRepository } from '../../../../hexagon/gateways/items.repository';
import { Item } from '../../../../hexagon/models/item';
import { AttributeType } from '../../../../hexagon/models/attribute';

export class JsonItemsRepository implements ItemsRepository {
  constructor(private readonly jsonPath: string) {}

  async findByName(name: string): Promise<Item | undefined> {
    const items: Record<string, Record<AttributeType, number>> = await import(
      this.jsonPath
    );

    const item = items[name];
    if (!item) return undefined;

    const attributes = Object.entries(item).map(([type, value]) => ({
      type: type as AttributeType,
      value,
    }));
    return Item.fromSnapshot({ name, attributes });
  }
}
