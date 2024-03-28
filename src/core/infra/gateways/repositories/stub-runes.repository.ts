import { RunesRepository } from '../../../hexagon/gateways/runes.repository';
import { Rune } from '../../../hexagon/models/rune';
import { AttributeType } from '../../../hexagon/models/attribute';

export class StubRunesRepository implements RunesRepository {
  private runes: Map<AttributeType, Rune[]> = new Map();
  async findByType(type: AttributeType): Promise<Rune[]> {
    return this.runes.get(type) || [];
  }

  givenRunes(rune: Rune[]) {
    rune.forEach((rune) =>
      this.runes.set(rune.snapshot.type, [
        ...(this.runes.get(rune.snapshot.type) || []),
        rune,
      ]),
    );
  }
}
