import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import {
  EthereumNodeService,
  NodeModule,
} from '@lidofinance/wallets-testing-nodes';
import { ConfigModule, ConfigService } from '../../config';

describe('Nodes package smoke tests', () => {
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

  it('Try init node package', async () => {
    await ethereumNodeService.startNode();
    expect(ethereumNodeService.state !== undefined);
    expect((await ethereumNodeService.getBalance()) === '6700.00');
    await ethereumNodeService.stopNode();
  }, 30000);
});
