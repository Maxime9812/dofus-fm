import { Item } from '../models/item';
import { InventoryRune } from '../models/inventory-rune';

export interface CraftGateway {
  getItem(): Promise<Item | undefined>;
  applyRune(runeName: string): Promise<void>;
  getInventoryRunes(): Promise<InventoryRune[]>;
}
