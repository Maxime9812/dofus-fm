import { Item, ItemSnapshot } from '../models/item';
import { AttributeType } from '../models/attribute';

export const itemBuilder = (
  snapshot: ItemSnapshot = { name: 'item name', attributes: [] },
) => ({
  withName: (name: string) => itemBuilder({ ...snapshot, name }),
  withAttributes: (...attributes: { type: AttributeType; value: number }[]) =>
    itemBuilder({
      ...snapshot,
      attributes,
    }),
  build: () => Item.fromSnapshot(snapshot),
});
