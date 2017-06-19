import { NgModule } from '@angular/core';
import { NativeScriptRouterModule } from 'nativescript-angular/router';
import { Routes } from '@angular/router';

import { ServersComponent } from './server/servers.component';
import { LocalReposComponent } from './local-repo/local-repos.component';

const routes: Routes = [
  { path: '', redirectTo: 'local-repos', pathMatch: 'full' },
  { path: 'servers', component: ServersComponent },
  { path: 'local-repos', component: LocalReposComponent }
];

@NgModule({
  imports: [NativeScriptRouterModule.forRoot(routes)],
  exports: [NativeScriptRouterModule]
})
export class AppRoutingModule {}
