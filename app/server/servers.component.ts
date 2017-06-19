import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Server } from './server';
import { ServerService } from './server.service';

@Component({
  selector: 'ns-servers',
  moduleId: module.id,
  templateUrl: './servers.component.html'
})
export class ServersComponent implements OnInit {
  servers: Server[];

  constructor(
    private serverService: ServerService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {}
}
