import { Component } from '@angular/core';
import { ModalDialogParams } from 'nativescript-angular/modal-dialog';
import { TextField } from 'ui/text-field';

import * as _ from 'lodash';

import { Server } from './server';
import { ServerService } from './server.service';

@Component({
  selector: 'modal-content',
  template: `
    <StackLayout margin="24" horizontalAlignment="center" verticalAlignment="center">
      <StackLayout class="input-field">
        <Label class="label" text="Url" row="1" col="0" textWrap="true"></Label>
        <TextField class="input input-border" id="serverUrlInput" [text]="serverUrl" (textChange)="onUrlChange($event)" hint="https://example.com:8080/" row="1" col="1"></TextField>
      </StackLayout>
      <StackLayout orientation="horizontal" marginTop="12">
        <Button text="ok" (tap)="validate()"></Button>
        <Button *ngIf="isEditMode" text="delete" (tap)="delete()"></Button>
        <Button text="cancel" (tap)="cancel()"></Button>
      </StackLayout>
    </StackLayout>
  `
})
export class ServerEditDialog {
  //
  private LOGTAG = '[server-edit-dialog]';
  public server = new Server();
  public isEditMode = false;
  private serverUrl = '';

  constructor(
    private serverService: ServerService,
    private params: ModalDialogParams
  ) {
    if (_.has(params, 'context.serverId')) {
      console.info(`${this.LOGTAG} Dialog Edit for ${params.context.serverId}`);
      this.isEditMode = true;
      this.serverService
        .get(params.context.serverId)
        .then(server => {
          this.server = server;
          this.serverUrl = server.getUrl();
        })
        .catch(error => {});
    } else {
      console.info(`${this.LOGTAG} Dialog Edit for new server`);
      this.isEditMode = false;
    }
  }

  public cancel() {
    this.params.closeCallback();
  }

  public validate() {
    if (this.serverUrl.trim() === '') {
      return;
    }
    this.server.setUrl(this.serverUrl);
    if (this.isEditMode) {
      this.serverService
        .update(this.server)
        .then(() => {
          this.params.closeCallback();
        })
        .catch(error => {});
    } else {
      this.serverService
        .add(this.server)
        .then(() => {
          this.params.closeCallback();
        })
        .catch(error => {});
    }
  }

  public delete() {
    this.serverService
      .delete(this.server.getId())
      .then(() => {
        this.params.closeCallback();
      })
      .catch(error => {});
  }

  public onUrlChange(args) {
    let textField = <TextField>args.object;
    this.serverUrl = textField.text;
  }
}
