export class Extension {
  id: string;
  url: string;

  constructor(id: string) {
    this.id = id;
    this.url = `chrome-extension://${id}`;
  }
}

export interface ExtensionVersionChange {
  name: string;
  before: string;
  after: string;
}
