import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EventData } from 'data/observable';
import { Button } from 'ui/button';
import dialogs = require('ui/dialogs');

import { Server } from './server';
import { ServerService } from './server.service';

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
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.refreshServerList();
  }

  refreshServerList() {
    console.info(`${this.LOGTAG} Refresh Server List`);
    this.serverService.list().then(servers => {
      this.servers = servers;
    });
  }

  onServerTap(args) {}

  onAddServerTap(args: EventData) {
    dialogs.prompt('Server Url').then(r => {
      if (r.text.trim() == '') {
        return;
      }
      const newServer = new Server();
      newServer.setUrl(r.text.trim());
      this.serverService
        .add(newServer)
        .then(() => {
          this.refreshServerList();
        })
        .catch(error => {
          console.error(`${this.LOGTAG} Add Server Tap Error: ${error}`);
        });
    });
  }
}
