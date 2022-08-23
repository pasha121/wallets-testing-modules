import { NodeModule } from '@lidofinance/wallets-testing-nodes';
import { ConfigModule, ConfigService } from './config';
import { DynamicModule } from '@nestjs/common';

export function prepareNodeModule(): DynamicModule {
  return NodeModule.forRoot(
    (configService: ConfigService) => {
      return { rpcUrl: configService.get('RPC_URL') };
    },
    [ConfigService],
    [ConfigModule],
  );
}
