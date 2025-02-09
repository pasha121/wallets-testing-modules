export interface CommonWalletConfig {
  WALLET_NAME: string;
  RPC_URL_PATTERN: string;
  STORE_EXTENSION_ID: string;
  CONNECT_BUTTON_NAME: string;
  SIMPLE_CONNECT: boolean;
}

export interface WalletConfig {
  SECRET_PHRASE: string;
  PASSWORD: string;
  COMMON: CommonWalletConfig;
  EXTENSION_PATH?: string;
}
