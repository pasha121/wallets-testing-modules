import { Module } from '@nestjs/common';
import { ConfigModule } from '../config';
import { ExtensionsModule } from '@lidofinance/wallets-testing-extensions';
import { BrowserService } from './browser.service';
import { prepareNodeModule } from '../commons';
import { BrowserContextService } from './browser.context.service';

@Module({
  controllers: [],
  providers: [BrowserService, BrowserContextService],
  exports: [BrowserService, BrowserContextService],
  imports: [ConfigModule, ExtensionsModule, prepareNodeModule()],
})
export class BrowserModule {}
