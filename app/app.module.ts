import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptModule } from 'nativescript-angular/nativescript.module';
import { AppRoutingModule } from './app.routing';
import { AppComponent } from './app.component';

import { ServerService } from './server/server.service';
import { ServersComponent } from './server/servers.component';
import { ServerEditDialog } from './server/server-edit-dialog';
import { LocalRepoService } from './local-repo/local-repo.service';
import { LocalReposComponent } from './local-repo/local-repos.component';

@NgModule({
  bootstrap: [AppComponent],
  imports: [NativeScriptModule, AppRoutingModule],
  declarations: [
    AppComponent,
    ServersComponent,
    LocalReposComponent,
    ServerEditDialog
  ],
  entryComponents: [ServerEditDialog],
  providers: [ServerService, LocalRepoService],
  schemas: [NO_ERRORS_SCHEMA]
})
export class AppModule {}
