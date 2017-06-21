export class LocalRepo {
  id: string;
  folder: string;
  projectId: string;
  
  constructor(id?: string) {
    if (id) {
      this.id = id;
    } else {
      this.id = this.generateId();
    }
  }
  
  public setFolder(folder: string) {
    this.folder = folder;
  }
  public getFolder(): string {
    return this.folder;
  }
  public setProjectId(projectId: string) {
    this.projectId = projectId;
  }
  public getProjectId(): string {
    return this.projectId;
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
