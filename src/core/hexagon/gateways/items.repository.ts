import { Item } from '../models/item';

export interface ItemsRepository {
  findByName(name: string): Promise<Item | undefined>;
}
