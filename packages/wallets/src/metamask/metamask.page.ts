import { BrowserContext, Page } from 'playwright';
import { WalletConfig } from '../wallets.constants';
import { WalletPage } from '../wallet.page';
import expect from 'expect';

export class MetamaskPage implements WalletPage {
  page: Page | undefined;

  constructor(
    private browserContext: BrowserContext,
    private extensionUrl: string,
    public config: WalletConfig,
  ) {}

  async navigate() {
    this.page = await this.browserContext.newPage();
    await this.page.goto(this.extensionUrl + '/home.html');
    await this.page.reload();
    await this.page.waitForTimeout(1000);
    await this.closePopover();
  }

  async setup() {
    await this.navigate();
    if (!this.page) throw "Page isn't ready";
    const firstTime = (await this.page.locator('text=Get started').count()) > 0;
    if (firstTime) await this.firstTimeSetup();
  }

  async importTokens(token: string) {
    await this.navigate();
    if (!this.page) throw "Page isn't ready";
    await this.page.click("text='import tokens'");
    await this.page.click('text=Custom token');
    await this.page.locator('id=custom-address').type(token);
  }

  async closePopover() {
    if (!this.page) throw "Page isn't ready";
    try {
      const popover =
        (await this.page.locator('data-testid=popover-close').count()) > 0;
      if (popover) await this.page.click('data-testid=popover-close');
    } catch (err) {}
  }

  async firstTimeSetup() {
    if (!this.page) throw "Page isn't ready";
    await this.page.locator('text=Get started').click();
    await this.page.locator('text=No thanks').click();
    await this.page.locator('text=Import wallet').click();
    let inputs = this.page.locator(
      '.import-srp__srp-word >> input[type=password]',
    );
    let seedWords = this.config.SECRET_PHRASE.split(' ');
    for (let i = 0; i < seedWords.length; i++) {
      await inputs.nth(i).fill(seedWords[i]);
    }
    await this.page.locator('id=password').fill(this.config.PASSWORD);
    await this.page.locator('id=confirm-password').fill(this.config.PASSWORD);
    await this.page.locator('id=create-new-vault__terms-checkbox').click();
    await this.page.locator('button[type=submit]').click();
    await this.page.locator('button').click();
    await this.closePopover();
  }

  async addNetwork(networkName: string, networkUrl: string, chainId: string) {
    if (!this.page) throw "Page isn't ready";
    await this.page.click('.account-menu__icon');
    await this.page.click('text=Settings');
    await this.page.click("text='Networks'");
    await this.page.click('text=Add a network');
    await this.page
      .locator(".form-field :has-text('Network Name') >> input")
      .fill(networkName);
    await this.page
      .locator(".form-field :has-text('New RPC URL') >> input")
      .fill(networkUrl);
    await this.page
      .locator(".form-field :has-text('Chain ID') >> input")
      .fill(chainId);
    await this.page
      .locator(".form-field :has-text('Currency symbol') >> input")
      .fill('ETH');
    await this.page.locator('text=Save').click();
    await this.navigate();
  }

  async importKey(key: string) {
    if (!this.page) throw "Page isn't ready";
    await this.navigate();
    await this.page.click('.account-menu__icon');
    await this.page.click('text=Import account');
    await this.page.fill('id=private-key-box', key);
    await this.page.click("text='Import'");
  }

  async connectWallet(page: Page) {
    await page.locator('text=Next').click();
    await page.locator('data-testid=page-container-footer-next').click();
    await page.close();
  }

  async assertTxAmount(page: Page, expectedAmount: string) {
    expect(await page.textContent('.currency-display-component__text')).toBe(
      expectedAmount,
    );
  }

  async confirmTx(page: Page) {
    await page.click('text=Confirm');
  }
}
