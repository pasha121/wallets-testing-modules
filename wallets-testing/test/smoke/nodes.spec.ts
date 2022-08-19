import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import {
  EthereumNodeService,
  NodeModule,
} from '@lidofinance/wallets-testing-nodes';
import { ConfigModule, ConfigService } from '../../config';
import { MATIC_TOKEN } from './consts';

describe('Ethereum node', () => {
  let app: INestApplication;
  let ethereumNodeService: EthereumNodeService;
  let configService: ConfigService;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        NodeModule.forRoot(
          (configService: ConfigService) => {
            return { rpcUrl: configService.get('RPC_URL') };
          },
          [ConfigService],
          [ConfigModule],
        ),
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    ethereumNodeService =
      moduleFixture.get<EthereumNodeService>(EthereumNodeService);
    configService = moduleFixture.get<ConfigService>(ConfigService);
    await app.init();
  });

  it('should init', async () => {
    await ethereumNodeService.startNode();
    expect(ethereumNodeService.state !== undefined);
    expect((await ethereumNodeService.getBalance()) === '6700.00');
  }, 30000);

  it('should set ERC20 balance', async () => {
    await ethereumNodeService.startNode();
    expect(ethereumNodeService.state !== undefined);
    const account = ethereumNodeService.state.accounts[0];
    expect(
      (
        await ethereumNodeService.setErc20Balance(account, MATIC_TOKEN, 0, 100)
      ).toString() === '100',
    );
  }, 30000);

  afterEach(async () => {
    await ethereumNodeService.stopNode();
  });
});
