import { JsonRunesRepository } from './json-runes.repository';
import { runeBuilder } from '../../../../hexagon/__tests__/rune.builder';

const jsonPath = `${__dirname}/__tests__/data/runes.json`;

describe('JsonRunesRepository', () => {
  it('should return rune with type', async () => {
    const agilityBuilder = runeBuilder().withType('agility');
    const runesRepository = new JsonRunesRepository(jsonPath);
    const runes = await runesRepository.findByType('agility');
    expect(runes).toEqual([
      agilityBuilder.withName('Rune Ra Age').withValue(10).build(),
      agilityBuilder.withName('Rune Pa Age').withValue(3).build(),
      agilityBuilder.withName('Rune Age').withValue(1).build(),
    ]);
  });
});
