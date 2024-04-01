import { InventoryRune } from '../models/inventory-rune';

export const inventoryRuneBuilder = (
  snapshot: InventoryRune = { name: 'rune', count: 1 },
) => ({
  build: () => snapshot,
  withName: (name: string) => inventoryRuneBuilder({ ...snapshot, name }),
  withCount: (count: number) => inventoryRuneBuilder({ ...snapshot, count }),
});
