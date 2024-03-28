import { Rune, RuneSnapshot } from '../models/rune';
import { AttributeType } from '../models/attribute';

export const runeBuilder = (
  snapshot: RuneSnapshot = {
    name: 'rune name',
    type: 'agility',
    value: 1,
  },
) => ({
  withName: (name: string) => runeBuilder({ ...snapshot, name }),
  withType: (type: AttributeType) => runeBuilder({ ...snapshot, type }),
  withValue: (value: number) => runeBuilder({ ...snapshot, value }),
  build: () => Rune.fromSnapshot(snapshot),
});
