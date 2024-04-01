import { CreatePerfectRollUseCase } from './core/hexagon/usecases/create-perfect-roll/create-perfect-roll.usecase';
import { StubCraftGateway } from './core/infra/gateways/craft/stub-craft.gateway';
import { JsonItemsRepository } from './core/infra/gateways/repositories/json/json-items.repository';
import { JsonRunesRepository } from './core/infra/gateways/repositories/json/json-runes.repository';

const itemsJsonPath = `${__dirname}/data/items.json`;
const runesJsonPath = `${__dirname}/data/runes.json`;

const craftGateway = new StubCraftGateway();
const itemsRepository = new JsonItemsRepository(itemsJsonPath);
const runesRepository = new JsonRunesRepository(runesJsonPath);

const createPerfectRoll = new CreatePerfectRollUseCase(
  craftGateway,
  itemsRepository,
  runesRepository,
);

const main = async () => {
  await createPerfectRoll.execute();
};

main();
