# Widgets Module

Module with playwright page objects for lido widgets

## Install

```bash
yarn add @lidofinance/wallets-testing-widgets
```

## Usage

```ts
import {Page} from "playwright";
import {EthereumPage} from "@lidofinance/wallets-testing-widgets";

export class MyService {
    constructor() {
    }

    async goToEthereumWidget(page: Page) {
        const ethereumPage = new EthereumPage(page, {stakeAmount: 100})
        await ethereumPage.navigate()
    }
}

```
