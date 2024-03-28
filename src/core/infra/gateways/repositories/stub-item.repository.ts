import { ItemsRepository } from '../../../hexagon/gateways/items.repository';
import { Item } from '../../../hexagon/models/item';

export class StubItemRepository implements ItemsRepository {
  private items: Map<string, Item> = new Map();
  async findByName(name: string) {
    return this.items.get(name);
  }

  givenItems(items: Item[]) {
    items.forEach((item) => this.items.set(item.snapshot.name, item));
  }
}
