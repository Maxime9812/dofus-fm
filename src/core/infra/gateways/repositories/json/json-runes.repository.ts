import { RunesRepository } from '../../../../hexagon/gateways/runes.repository';
import { AttributeType } from '../../../../hexagon/models/attribute';
import { Rune } from '../../../../hexagon/models/rune';

export class JsonRunesRepository implements RunesRepository {
  constructor(private readonly jsonPath: string) {}

  async findByType(type: AttributeType): Promise<Rune[]> {
    const runes: Record<AttributeType, { name: string; value: number }[]> =
      await import(this.jsonPath);
    return runes[type].map((rune) => Rune.fromSnapshot({ ...rune, type }));
  }
}
