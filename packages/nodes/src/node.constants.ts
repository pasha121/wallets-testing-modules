export const OPTIONS = 'RPC_NODE_OPTIONS';

export type EthereumNodeServiceOptions = {
  rpcUrl: string;
  port?: number;
  chainId?: number;
  defaultBalance?: number;
};

export class ServiceUnreachableError extends Error {
  private cause: { message: string };
  constructor(error: { message: string }, options: any) {
    super(error.message + `\n${JSON.stringify(options)}`);
    this.cause = error;
  }
}
