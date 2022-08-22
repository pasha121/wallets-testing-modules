import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import {
  ExtensionService,
  ExtensionsModule,
} from '@lidofinance/wallets-testing-extensions';
import * as fs from 'fs';

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
      'nkbihfbeogaeaoehlefnkodbefgpgknn',
    );
    expect(extensionDir).toBeDefined();
    expect(fs.readdirSync(extensionDir).length).toBeGreaterThan(0);
  }, 30000);
});
