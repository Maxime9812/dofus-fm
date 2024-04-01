import { JsonItemsRepository } from './json-items.repository';
import { itemBuilder } from '../../../../hexagon/__tests__/item.builder';

const jsonPath = `${__dirname}/__tests__/data/items.json`;
describe('JsonItemsRepository', () => {
  it('should return item with name', async () => {
    const itemsRepository = new JsonItemsRepository(jsonPath);
    const item = await itemsRepository.findByName('Ceinture Toré');
    expect(item.snapshot).toEqual(
      itemBuilder()
        .withName('Ceinture Toré')
        .withAttributes(
          { type: 'luck', value: 50 },
          { type: 'intelligence', value: 50 },
          { type: 'wise', value: 30 },
          { type: 'vitality', value: 301 },
          { type: 'critical', value: 2 },
          { type: 'damage', value: 5 },
          { type: 'heals', value: 5 },
          { type: 'range', value: 1 },
          { type: 'percent-damage', value: 10 },
          { type: 'prospecting', value: 20 },
        )
        .build().snapshot,
    );
  });
});
