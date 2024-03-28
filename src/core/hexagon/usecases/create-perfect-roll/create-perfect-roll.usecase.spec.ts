import { StubCraftGateway } from '../../../infra/gateways/craft/stub-craft.gateway';
import { itemBuilder } from '../../__tests__/item.builder';
import { StubItemRepository } from '../../../infra/gateways/repositories/stub-item.repository';
import { CreatePerfectRollUseCase } from './create-perfect-roll.usecase';
import { StubRunesRepository } from '../../../infra/gateways/repositories/stub-runes.repository';
import { runeBuilder } from '../../__tests__/rune.builder';

describe('Feature: Create perfect roll', () => {
  let craftGateway: StubCraftGateway;
  let itemsRepository: StubItemRepository;
  let runesRepository: StubRunesRepository;
  let createPerfectRoll: CreatePerfectRollUseCase;

  beforeEach(() => {
    craftGateway = new StubCraftGateway();
    itemsRepository = new StubItemRepository();
    runesRepository = new StubRunesRepository();
    createPerfectRoll = new CreatePerfectRollUseCase(
      craftGateway,
      itemsRepository,
      runesRepository,
    );
  });

  test('Item need strength and player has enough rune for roll', async () => {
    const swordBuilder = itemBuilder().withName('Sword');
    const perfectSword = swordBuilder
      .withAttributes({
        type: 'strength',
        value: 10,
      })
      .build();
    itemsRepository.givenItems([perfectSword]);
    craftGateway.item = swordBuilder
      .withAttributes({
        type: 'strength',
        value: 5,
      })
      .build();

    craftGateway.givenInventoryRunes([{ name: 'Rune Ra Fo', count: 1 }]);
    craftGateway.givenItemWithRune('Rune Ra Fo', perfectSword);

    runesRepository.givenRunes([
      runeBuilder()
        .withName('Rune Ra Fo')
        .withType('strength')
        .withValue(1)
        .build(),
    ]);

    await createPerfectRoll.execute();

    expect(craftGateway.item.snapshot).toEqual(
      swordBuilder.withAttributes({ type: 'strength', value: 10 }).build()
        .snapshot,
    );
  });

  test('Item need agility and player has enough rune for roll', async () => {
    const swordBuilder = itemBuilder().withName('Sword');
    const perfectSword = swordBuilder
      .withAttributes({
        type: 'agility',
        value: 10,
      })
      .build();
    itemsRepository.givenItems([perfectSword]);
    craftGateway.item = swordBuilder
      .withAttributes({
        type: 'agility',
        value: 5,
      })
      .build();

    runesRepository.givenRunes([
      runeBuilder()
        .withName('Rune Ra Age')
        .withType('agility')
        .withValue(1)
        .build(),
    ]);

    craftGateway.givenInventoryRunes([{ name: 'Rune Ra Age', count: 1 }]);
    craftGateway.givenItemWithRune('Rune Ra Age', perfectSword);

    await createPerfectRoll.execute();

    expect(craftGateway.item.snapshot).toEqual(
      swordBuilder.withAttributes({ type: 'agility', value: 10 }).build()
        .snapshot,
    );
  });

  test('Player have different rune', async () => {
    const swordBuilder = itemBuilder().withName('Sword');
    const perfectSword = swordBuilder
      .withAttributes({
        type: 'agility',
        value: 10,
      })
      .build();
    itemsRepository.givenItems([perfectSword]);
    craftGateway.item = swordBuilder
      .withAttributes({
        type: 'agility',
        value: 5,
      })
      .build();

    runesRepository.givenRunes([
      runeBuilder()
        .withName('Rune Ra Fo')
        .withType('strength')
        .withValue(1)
        .build(),
      runeBuilder()
        .withName('Rune Ra Age')
        .withType('agility')
        .withValue(1)
        .build(),
    ]);

    craftGateway.givenInventoryRunes([
      { name: 'Rune Ra Fo', count: 1 },
      { name: 'Rune Ra Age', count: 1 },
    ]);
    craftGateway.givenItemWithRune('Rune Ra Age', perfectSword);

    await createPerfectRoll.execute();

    expect(craftGateway.item.snapshot).toEqual(
      swordBuilder.withAttributes({ type: 'agility', value: 10 }).build()
        .snapshot,
    );
  });

  test('Item is already perfect', async () => {
    const swordBuilder = itemBuilder().withName('Sword');
    const perfectSword = swordBuilder
      .withAttributes({
        type: 'agility',
        value: 10,
      })
      .build();
    itemsRepository.givenItems([perfectSword]);
    craftGateway.item = perfectSword;

    await createPerfectRoll.execute();

    expect(craftGateway.item.snapshot).toEqual(perfectSword.snapshot);
  });

  describe('Rune value', () => {
    test('Player have multiple rune for same type but value change', async () => {
      const swordBuilder = itemBuilder().withName('Sword');
      const perfectSword = swordBuilder
        .withAttributes({
          type: 'strength',
          value: 10,
        })
        .build();
      itemsRepository.givenItems([perfectSword]);
      craftGateway.item = swordBuilder
        .withAttributes({
          type: 'strength',
          value: 5,
        })
        .build();

      runesRepository.givenRunes([
        runeBuilder()
          .withName('Rune Pa Fo')
          .withType('strength')
          .withValue(3)
          .build(),
        runeBuilder()
          .withName('Rune Ra Fo')
          .withType('strength')
          .withValue(10)
          .build(),
      ]);

      craftGateway.givenInventoryRunes([
        { name: 'Rune Ra Fo', count: 1 },
        { name: 'Rune Pa Fo', count: 1 },
      ]);
      craftGateway.givenItemWithRune('Rune Ra Fo', perfectSword);

      await createPerfectRoll.execute();

      expect(craftGateway.item.snapshot).toEqual(
        swordBuilder.withAttributes({ type: 'strength', value: 10 }).build()
          .snapshot,
      );
    });

    test('Player only have lowest rune', async () => {
      const swordBuilder = itemBuilder().withName('Sword');
      const perfectSword = swordBuilder
        .withAttributes({
          type: 'strength',
          value: 10,
        })
        .build();
      itemsRepository.givenItems([perfectSword]);
      craftGateway.item = swordBuilder
        .withAttributes({
          type: 'strength',
          value: 5,
        })
        .build();

      runesRepository.givenRunes([
        runeBuilder()
          .withName('Rune Pa Fo')
          .withType('strength')
          .withValue(3)
          .build(),
        runeBuilder()
          .withName('Rune Ra Fo')
          .withType('strength')
          .withValue(10)
          .build(),
      ]);

      craftGateway.givenInventoryRunes([{ name: 'Rune Pa Fo', count: 1 }]);
      craftGateway.givenItemWithRune('Rune Pa Fo', perfectSword);

      await createPerfectRoll.execute();

      expect(craftGateway.item.snapshot).toEqual(
        swordBuilder.withAttributes({ type: 'strength', value: 10 }).build()
          .snapshot,
      );
    });
  });

  test('Item is not perfect at first roll', async () => {
    const swordBuilder = itemBuilder().withName('Sword');
    const perfectSword = swordBuilder
      .withAttributes(
        {
          type: 'agility',
          value: 10,
        },
        {
          type: 'strength',
          value: 10,
        },
      )
      .build();
    itemsRepository.givenItems([perfectSword]);
    craftGateway.item = swordBuilder
      .withAttributes(
        {
          type: 'agility',
          value: 5,
        },
        {
          type: 'strength',
          value: 5,
        },
      )
      .build();

    runesRepository.givenRunes([
      runeBuilder()
        .withName('Rune Ra Age')
        .withType('agility')
        .withValue(1)
        .build(),
      runeBuilder()
        .withName('Rune Ra Fo')
        .withType('strength')
        .withValue(1)
        .build(),
    ]);

    craftGateway.givenInventoryRunes([
      { name: 'Rune Ra Age', count: 1 },
      { name: 'Rune Ra Fo', count: 1 },
    ]);
    craftGateway.givenItemWithRune(
      'Rune Ra Age',
      swordBuilder
        .withAttributes(
          {
            type: 'agility',
            value: 10,
          },
          {
            type: 'strength',
            value: 5,
          },
        )
        .build(),
    );

    craftGateway.givenItemWithRune('Rune Ra Fo', perfectSword);

    await createPerfectRoll.execute();

    expect(craftGateway.item.snapshot).toEqual(perfectSword.snapshot);
  });
});
