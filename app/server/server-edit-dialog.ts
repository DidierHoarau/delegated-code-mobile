import { Component } from '@angular/core';
import { ModalDialogParams } from 'nativescript-angular/modal-dialog';

import { Server } from './server';
import { ServerService } from './server.service';

@Component({
  selector: 'modal-content',
  template: `
    <StackLayout margin="24" horizontalAlignment="center" verticalAlignment="center">
        <Label [text]="server.getUrl()"></Label>
        <StackLayout orientation="horizontal" marginTop="12">
        <Button text="ok" (tap)="close('OK')"></Button>
        <Button text="delete" (tap)="delete()"></Button>
        <Button text="cancel" (tap)="close('Cancel')"></Button>
        </StackLayout>
    </StackLayout>
  `
})
export class ServerEditDialog {
  //
  private LOGTAG = '[server-edit-dialog]';
  public server = new Server();

  constructor(
    private serverService: ServerService,
    private params: ModalDialogParams
  ) {
    console.info(`${this.LOGTAG} Dialog Edit for ${params.context.serverId}`);
    this.serverService
      .get(params.context.serverId)
      .then(server => {
        this.server = server;
      })
      .catch(error => {});
  }

  public close(result?: string) {
    this.params.closeCallback(result);
  }

  public delete() {
    this.serverService
      .delete(this.server.getId())
      .then(() => {
        this.close();
      })
      .catch(error => {});
  }
}
