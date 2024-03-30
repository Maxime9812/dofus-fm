import { ItemsRepository } from '../../../../hexagon/gateways/items.repository';
import { Item } from '../../../../hexagon/models/item';

export class JsonItemsRepository implements ItemsRepository {
  async findByName(name: string): Promise<Item | undefined> {
    return undefined;
  }
}
