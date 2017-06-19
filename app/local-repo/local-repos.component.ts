import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { LocalRepo } from './local-repo';
import { LocalRepoService } from './local-repo.service';

@Component({
  selector: 'ns-local-repos',
  moduleId: module.id,
  templateUrl: './local-repos.component.html'
})
export class LocalReposComponent implements OnInit {
  localRepos: LocalRepo[];

  constructor(
    private localRepoService: LocalRepoService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {}
}
