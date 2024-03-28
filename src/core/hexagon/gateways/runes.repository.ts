import { Rune } from '../models/rune';
import { AttributeType } from '../models/attribute';

export interface RunesRepository {
  findByType(type: AttributeType): Promise<Rune[]>;
}
