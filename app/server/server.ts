export class Server {
  private id: string;
  private url: string;

  constructor(id?: string) {
    if (id) {
      this.id = id;
    } else {
      this.id = this.generateId();
    }
  }

  public setUrl(url: string) {
    this.url = url;
  }
  public getUrl(): string {
    return this.url;
  }
  public getId(): string {
    return this.id;
  }

  private generateId() {
    let text = '';
    const possible =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (let i = 0; i < 20; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
  }
}
