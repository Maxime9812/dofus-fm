import { Item } from '../models/item';
import { InventoryRune } from '../models/inventory-rune';
import { Rune } from '../models/rune';

export interface CraftGateway {
  getItem(): Promise<Item | undefined>;
  applyRune(rune: Rune): Promise<void>;
  getInventoryRunes(): Promise<InventoryRune[]>;
}
