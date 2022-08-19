import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import {
  ExtensionService,
  ExtensionsModule,
  WALLETS_EXTENSIONS,
} from '@lidofinance/wallets-testing-extensions';

describe('Extension service', () => {
  let app: INestApplication;
  let extensionService: ExtensionService;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [ExtensionsModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    extensionService = moduleFixture.get<ExtensionService>(ExtensionService);
    await app.init();
  });

  it('should init', async () => {
    const extensionDir = await extensionService.getExtensionDirFromId(
      WALLETS_EXTENSIONS.get('🦊 MetaMask'),
    );
    expect(extensionDir).toBeDefined();
  }, 30000);
});
