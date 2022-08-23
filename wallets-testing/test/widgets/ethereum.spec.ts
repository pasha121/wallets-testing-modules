import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { prepareNodeModule } from '../../commons';
import {
  COIN98_COMMON_CONFIG,
  CommonWalletConfig,
  MATHWALLET_COMMON_CONFIG,
  METAMASK_COMMON_CONFIG,
} from '@lidofinance/wallets-testing-wallets';
import { BrowserModule } from '../../browser/browser.module';
import { BrowserService } from '../../browser/browser.service';

const walletConfigsStake = [METAMASK_COMMON_CONFIG];
const walletConfigsConnect = [MATHWALLET_COMMON_CONFIG, COIN98_COMMON_CONFIG];

describe('Ethereum widget testing', () => {
  let app: INestApplication;
  let browserService: BrowserService;
  let config: CommonWalletConfig;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [prepareNodeModule(), BrowserModule],
    }).compile();
    app = moduleFixture.createNestApplication();
    await app.init();
    browserService = moduleFixture.get<BrowserService>(BrowserService);
  });

  beforeEach(async () => {
    await browserService.setup(config);
  }, 60000);

  for (config of walletConfigsStake) {
    test(`${config.WALLET_NAME} wallet stake`, async () => {
      await browserService.stake();
    }, 160000);
  }

  for (config of walletConfigsConnect) {
    test(`${config.WALLET_NAME} wallet connect`, async () => {
      await browserService.connectWallet();
    }, 90000);
  }

  afterEach(async () => {
    await browserService.teardown();
  });
});
