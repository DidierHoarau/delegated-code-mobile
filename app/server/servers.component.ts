import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EventData } from 'data/observable';
import { Button } from 'ui/button';
import {
  ModalDialogService,
  ModalDialogOptions
} from 'nativescript-angular/modal-dialog';
import dialogs = require('ui/dialogs');
import * as _ from 'lodash';

import { Server } from './server';
import { ServerService } from './server.service';
import { ServerEditDialog } from './server-edit-dialog';

@Component({
  selector: 'ns-servers',
  moduleId: module.id,
  templateUrl: './servers.component.html'
})
export class ServersComponent implements OnInit {
  //
  LOGTAG = '[servers.component]';
  servers: Server[];
  public counter: number = 0;

  constructor(
    private serverService: ServerService,
    private route: ActivatedRoute,
    private modalService: ModalDialogService,
    private viewContainerRef: ViewContainerRef
  ) {}

  ngOnInit(): void {
    this.refreshServerList();
  }

  refreshServerList() {
    console.info(`${this.LOGTAG} Refresh Server List`);
    this.serverService
      .list()
      .then(servers => {
        this.servers = servers;
      })
      .catch(error => {});
  }

  onServerEditTap(args) {
    const options: ModalDialogOptions = {
      context: {},
      viewContainerRef: this.viewContainerRef
    };
    if (_.has(args, 'index')) {
      options.context.serverId = this.servers[args.index].getId();
    }
    this.modalService
      .showModal(ServerEditDialog, options)
      .then(() => {
        this.refreshServerList();
      })
      .catch(error => {});
  }
}
